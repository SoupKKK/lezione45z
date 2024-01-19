// App.js
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import MyNavbar from './components/MyNavbar';
import SearchBar from './components/SearchBar';

import './App.css'
import FavSongs from './components/FavSongs';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SongCard from './components/SongsCard';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <MyNavbar />
                <SongCard />
              </>
            }
          />
          <Route path="/search" element={<SearchBar />} />
          <Route path='/FavouriteSongs' element={ <FavSongs/>}/>
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
