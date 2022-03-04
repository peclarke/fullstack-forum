import { FETCH_POSTS, FETCH_POSTS_SUCCESS, FETCH_POSTS_ERROR,
         CREATE_POST, CREATE_POST_SUCCESS, CREATE_POST_ERROR } from './postsTypes';

/**
 * Actions describe how the redux state is modified. 
 */

export const fetchPosts = () => {
    return {
        type: FETCH_POSTS,
        info: 'Attempt to fetch the posts information from the database',
    }
}

export const fetchPostsSuccess = posts => {
    return {
        type: FETCH_POSTS_SUCCESS,
        info: 'Fetching the data was successful',
        payload: posts
    }
}

export const fetchPostsError = error => {
    return {
        type: FETCH_POSTS_ERROR,
        info: 'Fetching the data was unsuccessful',
        payload: error
    }
}

export const createPost = () => {
    return {
        type: CREATE_POST,
        info: 'Attempt to create the new post',
    }
}

export const createPostsSuccess = new_post => {
    return {
        type: CREATE_POST_SUCCESS,
        info: 'Creating the post was successful',
        payload: new_post
    }
}

export const createPostsError = error => {
    return {
        type: CREATE_POST_ERROR,
        info: 'Creating the post was unsuccessful',
        payload: error
    }
}

/*
export const updateData = (author, body, created_at, title) => {
    return {
        type: UPDATE_DATA,
        info: 'Updates all posts'
    }
}*/