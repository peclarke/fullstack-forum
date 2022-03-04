import { AUTH_USER, LOGOUT_USER } from './userTypes';

/**
 * Actions describe how the redux state is modified. 
 */

export const authUser = (email, username, f_name, l_name, userObj) => {
    return {
        type: AUTH_USER,
        info: 'When a user has authenticated, save their information',
        payload: {
            "email": email,
            "username": username,
            "f_name": f_name,
            "l_name": l_name,
            "userObj": userObj
        }
    }
}

export const logoutUser = () => {
    return {
        type: LOGOUT_USER,
        info: 'When the user logs out, remove their information from state'
    }
}