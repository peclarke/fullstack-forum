import { FETCH_DATA, UPDATE_DATA, FETCH_DATA_SUCCESS, FETCH_DATA_ERROR } from './threadTypes';

const initialState = {
    loading: false,
    dates: [],
    error: ''
}

export const threadReducer = (state = initialState, action) => {
    switch(action.type) {
        case FETCH_DATA:
            return {
                ...state,
                loading: true
            }

        case FETCH_DATA_SUCCESS:
            return {
                loading: false,
                dates: action.payload,
                error: ''
            }
        
        case FETCH_DATA_ERROR:
            return {
                loading: false,
                dates: [],
                error: action.payload
            }

        case UPDATE_DATA:
            return {
                ...state
            }

        default: return state
    }
}

export default threadReducer