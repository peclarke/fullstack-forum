import React, { useState, useEffect} from 'react';

import { getFirestore, doc, setDoc, query, collection, where, getDocs } from "firebase/firestore";
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

import Heart from './Heart'

import Avatar from '@mui/material/Avatar';

function Post(props) {
    const [body, setBody] = useState(props.body);
    const [likes, setLikes] = useState(props.likes);
    
    const [date, setDate] = useState(props.date);

    const [author, setAuthor] = useState(props.author);

    const [name, setName] = useState();
    const [handle, setHandle] = useState();
    const [pic, setPic] = useState();

    // Find user information on start up
    useEffect(() => {
        console.log(author);
        firebase.firestore().collection("users").doc(author.id).get()
            .then((doc) => {
                var data = doc.data();
                setHandle(data['handle']);
                setName(data['f_name'] + " " + data['l_name']);
            })
    }, [])

    return (
        <>
            <div className="postContent">
                <div className="post-author">
                    <Avatar id="post-avatar" sx={{ bgcolor: "rgb(192, 192, 192)" }}>
                        PA
                    </Avatar>
                    <div className="names">
                        <span id="post-full-name">{name}</span>
                        <span>@{handle}</span>
                    </div>
                    <div className="time">
                        <span>{date.toLocaleDateString('en-US', {year: 'numeric', month: '2-digit', day: '2-digit'})}</span>
                        <span>{date.toLocaleTimeString('en-US')}</span>
                    </div>
                    <div className="likes">
                        <Heart selected={false}/>
                        <span>{likes} Likes</span>
                    </div>
                </div>
                <div className="post-body">
                    {body}
                </div>
            </div>
        </>
    )
}

export default Post