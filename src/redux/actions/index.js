// actions/index.js

//api fetch

export const FETCH_INFO_REQUEST = 'FETCH_INFO_REQUEST';
export const FETCH_INFO_SUCCESS = 'FETCH_INFO_SUCCESS';
export const FETCH_INFO_FAILURE = 'FETCH_INFO_FAILURE';


export const fetchInfo = (artist) => {
  return async (dispatch) => {
    try {


      dispatch({ type: FETCH_INFO_REQUEST });

      const url = `https://deezerdevs-deezer.p.rapidapi.com/search?q=${artist}`;
      const options = {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': '94dbd6567amsh99cb312777e427dp14e51fjsn74e5e2d81808',
          'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com'
        }
      };

      const response = await fetch(url, options);

      if (response.ok) {
        const result = await response.json();
        dispatch({ type: FETCH_INFO_SUCCESS, payload: result });

      } else {
        const error = await response.json();
        console.error(error);
        dispatch({ type: FETCH_INFO_FAILURE, payload: error });
      }
    } catch (error) {
      console.error(error);
      dispatch({ type: FETCH_INFO_FAILURE, payload: error });
    }
  };
};



//new user request


export const addUserRequest = 'ADD_USER_REQUEST';
export const addUserSuccess = 'ADD_USER_SUCCESS';
export const addUserFailure = 'ADD_USER_FAILURE';
export const LOGOUT_USER = 'LOGOUT_USER';
export const SET_USER_ID = "SET_USER_ID"


export const setIsAuthenticated = (value) => {
  return { type: 'SET_IS_AUTHENTICATED', payload: value };
};

export const setUserId = (value) => {
  return { type: 'SET_USER_ID', payload: value };
};

export const logoutUser = () => {
  return { type: LOGOUT_USER };
};

// actions/index.js

// ...

let nextCustomId = parseInt(localStorage.getItem('nextCustomId')) || 1;
let i = nextCustomId;

export const addUser = (username, password) => {
  return async (dispatch) => {
    try {
      dispatch({ type: addUserRequest });

      const user = {
        username: username,
        password: password,
        id: nextCustomId.toString(),
      };

      const response = await fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      if (response.ok) {
        const newUser = await response.json();
        dispatch({ type: addUserSuccess, payload: newUser });
        console.log('New user added:', newUser);

        // Incrementa l'ID personalizzato per il prossimo utente
        nextCustomId++;

        // Salva l'ID personalizzato nel localStorage
        localStorage.setItem('nextCustomId', nextCustomId);

      } else {
        const error = await response.json();
        console.error('Error adding user:', error);
        dispatch({ type: addUserFailure, payload: error });
      }
    } catch (error) {
      console.error('Error adding user:', error);
      dispatch({ type: addUserFailure, payload: error });
    }
  };
};


//fav songs

export const ADD_FAVORITE_SONG_REQUEST = 'ADD_FAVORITE_SONG_REQUEST';
export const ADD_FAVORITE_SONG_SUCCESS = 'ADD_FAVORITE_SONG_SUCCESS';
export const ADD_FAVORITE_SONG_FAILURE = 'ADD_FAVORITE_SONG_FAILURE';

export const addFavoriteSongRequest = () => ({
  type: ADD_FAVORITE_SONG_REQUEST,
});

export const addFavoriteSongSuccess = (data) => ({
  type: ADD_FAVORITE_SONG_SUCCESS,
  payload: data,
});

export const addFavoriteSongFailure = (error) => ({
  type: ADD_FAVORITE_SONG_FAILURE,
  payload: error.message || 'Unexpected error',
});

export const addFavoriteSong = (userId, song) => {
  return async (dispatch) => {
    try {
      // Fai la tua richiesta al server per aggiungere la canzone preferita all'utente
      const response = await fetch(`http://localhost:3000/users/${i}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ song }),
      });

      if (response.ok) {
        // Aggiorna lo stato Redux con la canzone preferita
        const addedSong = { userId, song };
        dispatch(addFavoriteSongSuccess(addedSong));
        console.log('Canzone preferita aggiunta con successo');
      } else {
        // Handle non-OK responses
        const errorMessage = await response.text();
        console.error('Errore nell\'aggiunta della canzone preferita:', errorMessage);
        dispatch(addFavoriteSongFailure({ message: errorMessage }));
      }
    } catch (error) {
      console.error('Errore nell\'aggiunta della canzone preferita:', error);
      dispatch(addFavoriteSongFailure(error));
    }
  };
};


