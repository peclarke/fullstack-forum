import { AUTH_USER, LOGOUT_USER } from './userTypes';

const initialState = {
    email: null,
    username: null,
    f_name: null,
    l_name: null,
    loggedIn: false
    // password isn't stored. Only used for auth purposes.
}

export const authReducer = (state = initialState, action) => {
    switch(action.type) {
        case AUTH_USER: return {
            ...state,
            email: action.payload.email,
            username: action.payload.username,
            f_name: action.payload.f_name,
            l_name: action.payload.l_name,
            userObj: action.payload.userObj,
            loggedIn: true
        }
        case LOGOUT_USER: return {
            ...state,
            email: null,
            username: null,
            f_name: null,
            l_name: null,
            userObj: null,
            loggedIn: false
        }
        default: return state;
    }
}

export default authReducer