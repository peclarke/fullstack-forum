import { CREATE_POST, CREATE_POST_SUCCESS, CREATE_POST_ERROR,
    FETCH_POSTS_SUCCESS, FETCH_POSTS_ERROR, FETCH_POSTS } from './postsTypes';

const initialState = {
    loading: false,
    posts: [],
    error: ''
}

export const postsReducer = (state = initialState, action) => {
    switch(action.type) {
        case FETCH_POSTS:
            return {
                ...state,
                loading: true
            }

        case FETCH_POSTS_SUCCESS:
            return {
                loading: false,
                posts: action.payload,
                error: ''
            }
        
        case FETCH_POSTS_ERROR:
            return {
                loading: false,
                posts: [],
                error: action.payload
            }

        case CREATE_POST:
            return {
                ...state,
                loading: true
            }

        case CREATE_POST_SUCCESS:
            return {
                loading: false,
                posts: state.posts.concat(action.payload),
                error: ''
            }
        
        case CREATE_POST_ERROR:
            return {
                loading: false,
                posts: [],
                error: action.payload
            }

        default: return state
    }
}

export default postsReducer