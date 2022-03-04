import { authReducer } from './user/userReducer';
import { threadReducer } from './threads/threadReducer';
import { postsReducer } from './posts/postsReducer';

const redux = require('redux');
const combineReducers = redux.combineReducers;

const rootReducer = combineReducers({
    auth: authReducer,
    thread: threadReducer,
    posts: postsReducer
})

export default rootReducer