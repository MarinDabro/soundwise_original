import React, { useState } from 'react';
import { useEffect } from 'react';
import { useToken } from '../../spotify.js';
import style from '../MusicBox.module.css'
import classes from './CategoryTracks.module.css'
export default function CategoryTracks(props) {
  const id = props.catId;
  const catName = props.catName;
  const trackId = props.trackId;
  console.log(trackId);
  const [tracks, setTracks] = useState(null);
  const trackName = props.trackName;
  const searchParams = useToken();

  const getCatTracks = async () => {
    await fetch(
      `https://api.spotify.com/v1/playlists/${trackId}/tracks`,
      searchParams
    )
      .then(res => res.json())
      .then(res => setTracks(res));
  };
  useEffect(() => {
    getCatTracks();
  }, []);

  return (
    <div className = {style.main}>
     {tracks && (
        <div>
          {tracks.items.map((track, index) => {
            console.log(track);
            return (
              <div className= {classes.trackInfo} key={index}>
              <div>{track.track.name}</div>  
              </div>
            );
          })}
        </div>
      )} 
    </div>
  );
}
