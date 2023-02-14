import React, { useContext } from 'react';
import { useEffect } from 'react';
import MainContext from '../../context/MainContext';

import { loginUrl } from '../../spotify';
import classes from './Login.module.css';

function Login() {
  const [STATE, DISPATCH] = useContext(MainContext);
  const { user, hashToken } = STATE;
  console.log('This is the login', user);
  const getUser = async () => {
    await fetch('https://api.spotify.com/v1/me', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + hashToken,
      },
    })
      .then(res => res.json())
      .then(res =>
        DISPATCH({
          type: 'SET_USER',
          user: res,
        })
      );
  };
  useEffect(() => {
    if (hashToken) {
      getUser();
    }
  }, [hashToken]);

  return (
    <div>
      {!user ? (
        <div className={classes.main}>
          <a href={loginUrl}>LOGIN TO SPOTIFY</a>
        </div>
      ) : (
        <div className={classes['login-button']}>
          <img
            className={classes.userImg}
            src={user?.images[0].url}
            alt="user_image"
          />

          <a href="#">{user?.display_name} </a>
        </div>
      )}
    </div>
  );
}

export default Login;
