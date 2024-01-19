// store/index.js

import { configureStore, combineReducers } from '@reduxjs/toolkit';
import infoReducer from '../reducers/infoReducer';
import userReducer from '../reducers/userReducer';
import authReducer from '../reducers/authReducer';
import favReducer from '../reducers/favReducer'; 

const rootReducer = combineReducers({
  info: infoReducer,
  user: userReducer,
  auth: authReducer,
  fav: favReducer, 
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
