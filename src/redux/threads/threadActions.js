import { FETCH_DATA, UPDATE_DATA, FETCH_DATA_SUCCESS, FETCH_DATA_ERROR } from './threadTypes';

/**
 * Actions describe how the redux state is modified. 
 */

export const fetchData = () => {
    return {
        type: FETCH_DATA,
        info: 'Attempt to fetch the thread information from the database',
    }
}

export const fetchDataSuccess = dates => {
    return {
        type: FETCH_DATA_SUCCESS,
        info: 'Fetching the data was successful',
        payload: dates
    }
}

export const fetchDataError = error => {
    return {
        type: FETCH_DATA_ERROR,
        info: 'Fetching the data was unsuccessful',
        payload: error
    }
}

export const updateData = (author, body, created_at, title) => {
    return {
        type: UPDATE_DATA,
        info: 'Updates a certain thread'
    }
}