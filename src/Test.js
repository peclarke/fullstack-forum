import React, { useState } from 'react';
import { Link, Redirect } from "react-router-dom";

import { authUser, logoutUser } from './redux';
import { useSelector, useDispatch } from 'react-redux';

import { getFirestore, collection, query, where, doc, setDoc, addDoc } from "firebase/firestore";
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

import Button from '@mui/material/Button';

import { does_user_exist } from './util/querys';
import { ThreadDate } from './data/date';
import { Thread } from './data/thread';

function Test(props) {
    const [result, setResult] = useState(null);
    const [fname, setName] = useState('');
    const [tids, setTids] = useState([]);
    const DB = getFirestore();

    const dispatch = useDispatch();

    const loggedIn = useSelector(state => state.loggedIn);
    const f_name = useSelector(state => state.f_name);

    const user_exists = () => {
        const res = does_user_exist(DB, 'daleyJ');
        setResult(res.toString());
    }

    const setupState = (uid) => {
        // uses the UID from user.credential
        firebase.firestore().collection("users").doc("wchgA4CDKBebIJoFhzoPQ6isIa42").get()
        .then(doc => {
            console.log(doc.data().f_name)
        })
    }

    const dateToStr = (dte) => {
        const day = dte.getDate();
        const month = dte.getMonth();
        const year = dte.getFullYear();
        return year+'-'+month+'-'+day;
    }

    // Sample date/thread data
    const fillDatesAndThreads = () => {
        const d1 = new Date(2021,1,2);
        const d2 = new Date(2021,1,3);
        const d3 = new Date(2021,1,4);
        const d4 = new Date(2021,1,5);

        const time1 = new Date(2021,1,2, 11, 11, 11);
        const time2 = new Date(2021,1,3, 3, 5, 18);
        const time3 = new Date(2021,1,3, 19, 6, 22);
        const time4 = new Date(2021,1,4, 8, 51, 16);

        const t1 = new Thread(time1, "Leaving forever...", "xfilez", "It's time I get outta here. Cya!", 3);
        const t2 = new Thread(time2, "Very cute animals", "pablo", "Look at this dog!", 4);
        const t3 = new Thread(time3, "A note.", "wild", "Scared you!", 2);
        const t4 = new Thread(time4, "Voting on the future", "wild", "We'll be doing a vote tomorrow", 0);

        // query DB for tids
        let tids = []
        firebase.firestore().collection("threads").get()
            .then(doc => {
                // sort the dates in descending order
                doc.docs.map(el => tids.push({id: el.id, created_at: el.created_at}))
            })

        const day1 = new ThreadDate(d1, [tids[0]]);
        const day2 = new ThreadDate(d2, [tids[1], tids[2]]);
        const day3 = new ThreadDate(d3, [tids[3]]);
        const day4 = new ThreadDate(d4, []);

        return [[
            day1,
            day2,
            day3,
            day4
        ], [
            t1,
            t2,
            t3,
            t4
        ]]
    }

    /**
     * FYI the date object is located under data. 
     */
    const resetDates = () => {
        const initial_state = fillDatesAndThreads()[0];
        // commit to DB
        initial_state.map((docu) => {
            console.log(docu);
            const key = dateToStr(docu.created_at);
            const date_ref = doc(DB, 'dates', key)
            setDoc(date_ref, docu);
        })
    }

    const resetThreads = () => {
        let new_tids = [];
        const initial_state = fillDatesAndThreads()[1];
        initial_state.map((el) => {
            firebase.firestore().collection("threads").add(el)
                .then((res) => {
                    new_tids.push(res.id);
                    console.log("Completed successfully.");
                })
                .catch((err) => {
                    console.log("Uh Oh: "+ err);
                })
            return null;
        });
        setTids(new_tids);
    }

    const testSet = () => {

        firebase.firestore().collection("threads").add({
            name: "Tokyo",
            country: "Japan"
        })
        .then((docRef) => {
            console.log("Document written with ID: ", docRef.id);
        })
        .catch((error) => {
            console.error("Error adding document: ", error);
        }); 
    }

    const threadQuery = () => {
        let all_dates = [];
        // query DB for all thread information and put it in redux
        firebase.firestore().collection("threads").get()
            .then((doc) => {
                // sort the dates in descending order
                doc.docs.map(el => 
                    all_dates.push({
                        id: el.id,
                        ...el.data()
                    })
                )

                console.log(all_dates);
                all_dates.sort((a, b) => a.created_at - b.created_at);
                console.log(all_dates);
        
                // I'm currently trying to get the tid as a prop into the thread
                // so we can use it when we refer to it in user-thread interaction DB.
                // This is a test to see if we can modify the query to give us both
                // the data and the ID. Then, using this id, we can save that id under the
                // respective date.
            })
            .catch((error) => {
                
            })
    }

    return(
        <>
        <h1>This is the testing page!</h1>
        <Link to="/"><Button variant="contained" onClick={null}>Route to Home</Button></Link>
        <p>All Back-End / Front-End tests can be done here in isolation.</p>
        <p>The result to the button query: {result} (check console.log)</p>
        <ol>
            <li><Button variant="contained" onClick={user_exists}>Check if username 'daleyJ' exists</Button></li>
            <li><Button variant="contained" onClick={() => console.log(loggedIn)}>Console Log loggedIn status</Button></li>
            <li><Button variant="contained" onClick={() => console.log(f_name)}>Console Log f_name status</Button></li>
            <li><Button variant="contained" onClick={() => dispatch(authUser("testy@gmail.com", "testuser", "Test", "User"))}>Auth user "testuser"</Button></li>
            <li><Button variant="contained" onClick={() => dispatch(logoutUser())}>Log out user</Button></li>
            <li><Button variant="contained" onClick={() => setupState("")}>Console Log Desmond's DB Info</Button></li>
            <li><Button variant="contained" onClick={() => resetDates()}>Reset All Date/Thread Info</Button></li>
            <li><Button disabled variant="contained" onClick={() => resetThreads()}>Reset All Threads</Button></li>
            <li><Button variant="contained" onClick={threadQuery}>Thread Query</Button></li>
        </ol>
        </>
    )
}

export default Test;