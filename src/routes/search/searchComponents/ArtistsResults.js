import React, { useContext } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import DisplayContext from '../../../context/DisplayContext.js';
import style from '../../MusicBox.module.css';

const ArtistsResults = ({ artists }) => {
  const [state, dispatch] = useContext(DisplayContext);

  return (
    <div className={style.main}>
      <div>
        {artists && (
          <div>
            <div className={style.albumContainer}>
              {artists?.map((artist, index) => {
                return (
                  <NavLink
                    to="/artist"
                    onClick={() => {
                      dispatch({
                        type: 'SET_ARTIST',
                        artist: artist,
                      });
                    }}
                    key={index}
                    className={style.albumBox}
                  >
                    <div className={`${style.albumImage} ${style.artistImage}`}>
                      <img
                        src={artist?.images[0]?.url}
                        alt="/artist_image"
                      />
                    </div>
                    <div className={style.albumName} title={`${artist.name}`}>
                      {artist.name}
                    </div>
                    <div className={style.artistName}>{artist.owner ? artist.owner.display_name : artist.type.toUpperCase()}</div>
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

export default ArtistsResults;
