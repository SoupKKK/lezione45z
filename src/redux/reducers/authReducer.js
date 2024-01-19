// reducers/authReducer.js

import { LOGOUT_USER } from '../actions/index';

const initialState = {
    isAuthenticated: false,
    // other properties...
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGOUT_USER:
            return {
                ...state,
                isAuthenticated: false,
            };
        case 'SET_IS_AUTHENTICATED':
            return {
                ...state,
                isAuthenticated: action.payload,
            };
        default:
            return state;
    }
};

export default authReducer;
