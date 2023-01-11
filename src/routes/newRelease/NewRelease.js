import React, { useEffect, useContext } from 'react';
import classes from './NewRelease.module.css';
import MainContext from '../../context/MainContext';


export default function NewRelease(props) {
  const token = `${props.token}`;
  const [STATE, DISPATCH] = useContext(MainContext);
  const { newRelease, user } = STATE;
  console.log(newRelease);
     /* console.log(newRelease.albums.items[0].name);  */

  useEffect(() => {
    async function getNewRelease() {
      await fetch('https://api.spotify.com/v1/browse/new-releases', {
        method: 'GET',
        accept: 'application/json',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
        .then(res => res.json())
        .then(res => {
          DISPATCH({
            type: 'SET_NEW_RELEASE',
            newRelease: res,
          });
        });
    }
    getNewRelease();
  }, [ ]);


  return(
    <div>

      {newRelease  &&  <div>{newRelease.albums.items[0].name}</div>}
    </div>
  )
}
