// reducers/index.js (o ovunque tu stia gestendo i tuoi reducer)

import {
    ADD_FAVORITE_SONG_REQUEST,
    ADD_FAVORITE_SONG_SUCCESS,
    ADD_FAVORITE_SONG_FAILURE,
  } from '../actions';
  
  const initialState = {
    favSongs: [],
    // ... altri stati iniziali se presenti
  };
  
  const favReducer = (state = initialState, action) => {
    switch (action.type) {
      case ADD_FAVORITE_SONG_REQUEST:
        // Puoi gestire le azioni di richiesta se necessario
        return state;
  
      case ADD_FAVORITE_SONG_SUCCESS:
        return {
          ...state,
          favSongs: [...state.favSongs, action.payload.song],
        };
  
      case ADD_FAVORITE_SONG_FAILURE:
        // Puoi gestire le azioni di fallimento se necessario
        return state;
  
      // ... altri casi di switch per gestire altre azioni
  
      default:
        return state;
    }
  };
  
  export default favReducer;
  