import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom'

import { fetchPosts, fetchPostsSuccess, fetchPostsError} from './redux';
import { connect, useSelector, useDispatch } from 'react-redux';

import { getFirestore, doc, setDoc, query, collection, where, getDocs } from "firebase/firestore";
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

import Nav from './Nav';
import ProfileWidget from './ProfileWidget';
import ThreadContent from './ThreadContent';
import WritePost from './WritePost';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import CircularProgress from '@mui/material/CircularProgress';
import TextField from '@mui/material/TextField';

function WriteThread(props) {
    const [title, setTitle] = useState('');

    const handleChange = (e) => {
        setTitle(e.target.value)
    }

    const handleSubmit = (post) => {
        // create thread

        // create post
    }

    return(
        <>
        <Grid container>
            <Grid item xs={1.85}>
                <Nav />
            </Grid>
            <Grid item xs={4.15}>
                {
                    <div className="create-thread-content">
                        <h2>Create your Thread</h2>
                        <div className="title-input">
                            <Box
                                component="form"
                                sx={{
                                    '& .MuiTextField-root': { m: 1, width: '55ch'},
                                }}
                                noValidate
                                autoComplete="off"
                            >
                                <TextField
                                    id="thread-title-input"
                                    label="Type your thread title here"
                                    multiline
                                    required
                                    value={title}
                                    onChange={handleChange}
                                    rows={2}
                                    placeholder=""
                                    variant="filled"
                                />
                            </Box>
                        </div>
                        <WritePost label="Write your thread here..." thread={null} ttitle={title} mult={4} update={null} submit={handleSubmit}/>
                    </div>
                }
            </Grid>
            <Grid item xs={6}>
                <ProfileWidget />

                {
                    // around here will go our back button and like button
                }

            </Grid>
        </Grid>
        </>
    )
}

export default WriteThread