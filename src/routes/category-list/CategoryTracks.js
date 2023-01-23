import React, { useContext } from 'react';
import { useEffect } from 'react';
import { useToken } from '../../spotify.js';
import DisplayContext from '../../context/DisplayContext.js';
import style from '../MusicBox.module.css';
import classes from './CategoryTracks.module.css';
import { NavLink, Outlet } from 'react-router-dom';

export default function CategoryTracks(props) {
  const [display, dispatch] = useContext(DisplayContext);
  const {
    catName,
    catId,
    trackId,
    trackName,
    tracks,
    playLists,
    activePlaylist,
  } = display;

  console.log(playLists);
  console.log(catName);
  console.log(catId);
  console.log(trackId);
  console.log(tracks);
  console.log(trackName);

  const searchParams = useToken();

  const getCatTracks = async () => {
    await fetch(
      `https://api.spotify.com/v1/playlists/${trackId}/tracks`,
      searchParams
    )
      .then(res => res.json())
      .then(res =>
        dispatch({
          type: 'SET_TRACKS',
          tracks: res,
        })
      );
  };
  useEffect(() => {
    if (trackId) {
      getCatTracks();
    }
  }, []);

  return (
    <div className={classes.main}>
      {tracks && (
        <div>
          <div className={classes.headerNav}>The top nav</div>
          <div className={classes.header}>
            <img src={activePlaylist.images[0].url} alt="track_image" />
            <div>
              <h2>{trackName}</h2>
              <p>{activePlaylist.description}</p>
              <NavLink to='/profile'>Spotify</NavLink>
            </div>
          </div>
          <div>
            {tracks.items.map((track, index) => {
              console.log(track);
              return (
                <div className={classes.trackInfo} key={index}>
                  <div>{track.track.name}</div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
