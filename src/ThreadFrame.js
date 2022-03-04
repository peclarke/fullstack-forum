import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom'

import { fetchData, fetchDataSuccess, fetchDataError, updateData } from './redux';
import { connect, useSelector, useDispatch } from 'react-redux';

import { getFirestore, doc, setDoc, query, collection, where } from "firebase/firestore";
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

import ThreadBlock from './ThreadBlock';

import { ThemeProvider } from '@mui/material/styles';
import { threadButtonTheme } from './util/themes';

import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';

const mapStateToProps = state => {
    return {
        loading: state.thread.loading,
        dates: state.thread.dates,
        error: state.thread.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchData: () => dispatch(fetchData()),
        fetchDataSuccess: all_dates => dispatch(fetchDataSuccess(all_dates)),
        fetchDataError: error => dispatch(fetchDataError(error)),
    }
}

function ThreadFrame(props) {
    const [ordDates, setOrdDates] = useState([]);
    const loggedIn = useSelector(state => state.auth.loggedIn);

    useEffect(() => {
        updateThreads();
    }, []);

    const updateThreads = () => {
        let all_dates = [];
        // query DB for all thread information and put it in redux
        props.fetchData();
        firebase.firestore().collection("threads").get()
            .then((doc) => {

                // sort the dates in descending order
                doc.docs.map(el => 
                    all_dates.includes({id: el.id, ...el.data()}) ? null :
                        all_dates.push({
                            id: el.id,
                            ...el.data()
                        })
                )

                all_dates.sort((a, b) => a.created_at - b.created_at);
                setOrdDates(all_dates);
                props.fetchDataSuccess(all_dates);
            })
            .catch((error) => {
                props.fetchDataError(error);
            })
    }

    const groupDates = (date_list) => {
        var grouped_dates = {}
        for (var i = 0; i < date_list.length; i++) {
            var formatted = date_list[i].created_at.toDate().toLocaleDateString('en-US', {year: 'numeric', month: '2-digit', day: '2-digit'})
            if (grouped_dates[formatted] === undefined) {
                grouped_dates[formatted] = [date_list[i].created_at.toDate(), [date_list[i]]];
            } else {
                grouped_dates[formatted][1].push(date_list[i]);
            }
        }

        return grouped_dates;
    }

    return (
        <>
        <div className="thread-controls">
            <ThemeProvider theme={threadButtonTheme}>
                {
                
                <Link to={loggedIn ? "/new" : "/login"}>
                    <Tooltip title={loggedIn ? "" : "You need to be logged in to create a thread"}>
                    <span>
                        <Button disabled={!loggedIn} variant="contained">Create</Button>
                    </span>
                    </Tooltip>
                </Link>

                }
                <Button onClick={updateThreads} variant="contained">Refresh</Button>
            </ThemeProvider>
        </div>
        <div className="thread-frame">
        
            {
                
                props.loading ?
                <div className="loading-threads">
                    <CircularProgress size="6rem"/>
                </div>
                :
                Object.keys(groupDates(ordDates)).map(function(el, index) {
                    return <ThreadBlock key={"thread-block-"+index} group={groupDates(ordDates)[el][1]} date={groupDates(ordDates)[el][0]}/>
                })
                //console.log(groupDates(ordDates))
                //groupDates(ordDates).map((el, i) => <ThreadBlock key={"thread-block-"+i} date={el} group={el}/>).reverse()
                //console.log(ordDates) // THREADS SHOULD BE GROUPED BY DATE BEFORE HITTING THIS POINT
                //ordDates.map((el, i) => <ThreadBlock key={"thread-block-"+i} date={el}/>).reverse()
            }
        </div>
        </>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(ThreadFrame)