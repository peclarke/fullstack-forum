import React, { useState } from 'react';

import { createPost, createPostsSuccess, createPostsError} from './redux';
import { connect, useSelector, useDispatch } from 'react-redux';

import { addDoc, collection, getFirestore } from "firebase/firestore";
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

import DOMPurify from 'dompurify';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { ThemeProvider } from '@mui/material/styles';
import Tooltip from '@mui/material/Tooltip';

import { threadButtonTheme } from './util/themes';

const mapStateToProps = state => {
    return {
        loading: state.posts.loading,
        posts: state.posts.dates,
        error: state.posts.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        createPost: () => dispatch(createPost()),
        createPostSuccess: posts => dispatch(createPostsSuccess(posts)),
        createPostError: error => dispatch(createPostsError(error)),
    }
}

function WritePost(props) {
    const [reply, setReply] = useState("")

    const userObj = useSelector(state => state.auth.userObj);

    const handleChange = (e) => {
        setReply(e.target.value)
    }

    // Update redux and firebase with new post
    const handleSubmit = (event) => {
        props.createPost()

        const post_info = {
            body: DOMPurify.sanitize(reply),
            created_at: firebase.firestore.FieldValue.serverTimestamp(),
            likes: 0,
            thread: props.thread,
            author: userObj
        }
        const db = getFirestore();
        addDoc(collection(db, 'posts'), post_info).then((doc) => {
            props.createPostSuccess(post_info);
            props.update();
        }).catch((err) => {
            props.createPostError();
        })


    }

    const handleSave = (e) => {
        alert("Haven't done it yet. Sorry.")
    }

    return(
        <>
            <div className="write-post">
                    <Box
                        component="form"
                        sx={{
                            '& .MuiTextField-root': { m: 3, width: '73ch' },
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <TextField
                            id="filled-multiline-static"
                            label={props.label}
                            multiline
                            required
                            value={reply}
                            onChange={handleChange}
                            rows={4 * props.mult}
                            placeholder=""
                            variant="filled"
                        />
                    </Box>
                    <div className="post-buttons">
                        <ThemeProvider theme={threadButtonTheme}>
                            <Tooltip title={props.ttitle !== null ? props.ttitle.length < 1 ? "Your thread needs a title" : reply.length < 1 ? "Your thread needes a post" : "" : reply.length < 1 ? "You must write a reply" : ""}>
                                <span><Button disabled={props.ttitle !== null ? props.ttitle.length < 1 || reply.length < 1 : reply.length < 1} onClick={props.submit === null ? handleSubmit(reply) : props.submit} className="post-btn" variant="contained">Submit</Button></span>
                            </Tooltip>
                            <Tooltip title={props.ttitle !== null ? props.ttitle.length < 1 ? "Your thread needs a title" : reply.length < 1 ? "Your thread needes a post" : "" : reply.length < 1 ? "You must write a reply" : ""}>
                                <span><Button disabled={props.ttitle !== null ? props.ttitle.length < 1 || reply.length < 1 : reply.length < 1} onClick={handleSave} className="post-btn" variant="contained">Save</Button></span>
                            </Tooltip>
                        </ThemeProvider>
                    </div>
            </div>
        </>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(WritePost)