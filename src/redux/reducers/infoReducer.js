// reducers/infoReducer.js

import {
    FETCH_INFO_REQUEST,
    FETCH_INFO_SUCCESS,
    FETCH_INFO_FAILURE,
  } from '../actions/index'
  
  const initialState = {
    loading: false,
    error: null,
    data: null,
  };
  
  
  const infoReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_INFO_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
        };
        case FETCH_INFO_SUCCESS:
          return {
            ...state,
            loading: false,
            data: action.payload,
          };
        
      case FETCH_INFO_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default infoReducer;
  