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

import Grid from '@mui/material/Grid';
import CircularProgress from '@mui/material/CircularProgress';

const mapStateToProps = state => {
    return {
        loading: state.posts.loading,
        posts: state.posts.dates,
        error: state.posts.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchData: () => dispatch(fetchPosts()),
        fetchDataSuccess: posts => dispatch(fetchPostsSuccess(posts)),
        fetchDataError: error => dispatch(fetchPostsError(error)),
    }
}

function ThreadBody(props) {
    let { id } = useParams();

    const [posts, setPosts] = useState([]);
    const [title, setTitle] = useState();

    const loggedIn = useSelector(state => state.auth.loggedIn);

    const [threadRef, setThreadRef] = useState(firebase.firestore().collection('threads').doc(id))

    const updatePosts = () => {
        let all_posts = [];
        props.fetchData();

        // Grab the thread title, while we're here
        threadRef.get().then((doc) => setTitle(doc.data()['title']))

        firebase.firestore()
            .collection('posts')
            .where('thread', '==', threadRef)
            .get()
            .then((doc) => {      
                // format all the posts nicely and put them in an array
                doc.docs.map(el =>
                    all_posts.push({
                        id: el.id,
                        ...el.data()
                    })
                )
                all_posts.sort((a, b) => a.created_at - b.created_at);
                // update state and our redux
                setPosts(all_posts);
                props.fetchDataSuccess(all_posts);
            })
            .catch((error) => {
                props.fetchDataError(error);
            })
    }

    /**
     * Query DB for all post information and put it in redux
     */
    useEffect(() => {
        updatePosts();
    }, []);

    return(
        <>
            <Grid container>
                <Grid item xs={1.85}>
                    <Nav />
                </Grid>
                <Grid item xs={4.15}>
                    {
                        props.loading ?
                        <div className="loading-threads">
                            <CircularProgress size="6rem"/>
                        </div>
                        :
                        <div className="net-thread-content">
                            <ThreadContent post_list={posts} title={title}/>
                            {loggedIn ? <WritePost label={"Write your reply..."} submit={null} ttitle={null} mult={1} thread={threadRef} update={updatePosts}/> : 
                            <Link to="/login">
                                <div id="post-auth-msg">
                                    <h3>Log in to post!</h3>
                                </div>
                            </Link>}
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

export default connect(mapStateToProps, mapDispatchToProps)(ThreadBody)