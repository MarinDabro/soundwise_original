import React, { useState, useEffect } from 'react';

import NewRelease from '../newRelease/NewRelease';
import classes from './Home.module.css';

export default function Home(props) {
  const [token, setToken] = useState('');
  const SPOTIFY_CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET;
  const SPOTIFY_CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
  useEffect(() => {
    fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      body:
        'grant_type=client_credentials&client_id=' +
        SPOTIFY_CLIENT_ID.toString('base64') +
        '&client_secret=' +
        SPOTIFY_CLIENT_SECRET.toString('base64'),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
      .then(r => r.json())
      .then(r => {
        setToken(r.access_token);
       
      });
  }, []);

  return (
    <div className={classes.main}>
     {token !== '' && <NewRelease token={token} /> } 
    </div>
  );
}
