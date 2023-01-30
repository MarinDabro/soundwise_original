import React, { useContext } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import DisplayContext from '../../../context/DisplayContext.js';

import style from '../../MusicBox.module.css';

const PlaylistResults = ({ playlists }) => {
  const [state, dispatch] = useContext(DisplayContext);

  return (
    <div className={style.main}>
      <div>
        {playlists && (
          <div>
            <div className={style.albumContainer}>
              {playlists?.items?.map((playlist, index) => {
                return (
                  <NavLink
                    to="/activePlaylist"
                    onClick={() => {
                      dispatch({
                        type: 'SET_ACTIVE_PLAYLIST',
                        activePlaylist: playlist,
                      });
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
                  </NavLink>
                );
              })}
            </div>
          </div>
        )}
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default PlaylistResults;
