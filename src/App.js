import React, { useEffect, useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import { spotify } from './spotify';

import { GetTokenFromResponse } from './spotify';
/* import MainContextProvider from "./context/MainContextProvider.js" */
import MainContext from './context/MainContext.js';
import Nav from './components/nav/Nav';
import Home from './routes/home/Home';
import Search from './routes/search/Search';
import Library from './routes/library/Library';
import Playlist from './routes/playlist/Playlist';
import Login from './routes/login/Login';
import Songs from './routes/songs/Songs';
import classes from './App.module.css';

function App() {
  const [{ token }, DISPATCH] = useContext(MainContext);

  useEffect(() => {
    const hash = GetTokenFromResponse();
    window.location.hash = "";

    let _token = hash.access_token;

    if (_token) {
      spotify.setAccessToken(_token);
      DISPATCH({
        type: 'SET_TOKEN',
        token: _token,
      });

      spotify.getMe().then(user => {
        console.log(user);
        DISPATCH({
          type: 'SET_USER',
          user,
        });
      });
    }
  }, [token]);

  return (
    /*  <MainContextProvider> */
    <div className={classes.main}>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="search" element={<Search />} />
        <Route path="library" element={<Library />} />
        <Route path="playlist" element={<Playlist />} />
        <Route path="songs" element={<Songs />} />
        {/* <Route path="login" element={<Login />} /> */}
      </Routes>
      <Login />
    </div>
    /*   </MainContextProvider> */
  );
}

export default App;
