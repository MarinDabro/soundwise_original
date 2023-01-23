import React, { useState } from 'react';
import { useEffect } from 'react';
import { useToken } from '../../spotify.js';
import classes from './CategoryList.module.css';
import style from '../MusicBox.module.css';
import CategoryTracks from './CategoryTracks.js';
export default function CategoryList({ catId, catName }) {
  const searchParams = useToken();
  const [playlist, setPlaylist] = useState(null);
  const [trackId, setTrackId] = useState('');
  const [trackName, setTrackName] = useState('');

  console.log(playlist);

  const getCatPlaylist = async () => {
    await fetch(
      `https://api.spotify.com/v1/browse/categories/${catId}/playlists`,
      searchParams
    )
      .then(res => res.json())
      .then(res => setPlaylist(res));
  };
  useEffect(() => {
    getCatPlaylist();
  }, []);

  return (
    <div className={style.main}>
      <div>
        {playlist && (
          <div>
            <h2 className={classes.header}> {catName} </h2>
            <div className={style.albumContainer}>
              {playlist.playlists.items.map((playlist, index) => {
                return (
                  <div
                    onClick={() => {
                      setTrackId(playlist.id);
                      setTrackName(playlist.name);
                    }}
                    key={index}
                    className={style.albumBox}
                  >
                    <div className={style.albumImage}>
                      <img
                        src={playlist.images[0].url}
                        alt="/ playlist_image"
                      />
                    </div>
                    <div className={style.albumName}>
                      {playlist.description}
                    </div>
                    <div className={style.artistName}>{playlist.name}</div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
      <div>
        {trackId && (
          <CategoryTracks
            catId={catId}
            catName={catName}
            trackId={trackId}
            trackName={trackName}
          />
        )}
      </div>
    </div>
  );
}
