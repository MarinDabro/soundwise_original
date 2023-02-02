import React, { useContext, useEffect, useState, useRef } from "react";
import { useToken } from '../../spotify.js';
import DisplayContext from '../../context/DisplayContext.js';
import style from '../MusicBox.module.css';
import classes from './CategoryTracks.module.css';
import { NavLink, Outlet } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-regular-svg-icons';
import msToTime from '../../functions/timer.js';

import { prominent } from 'color.js';
import Bouncer from '../../functions/bouncer.js';

export default function CategoryTracks() {
  const [display, dispatch] = useContext(DisplayContext);
  const { tracks, activePlaylist } = display;
  const [colors, setColors] = useState(null);
  const [duration, setDuration] = useState('');
  const [isActive, setIsActive] = useState(-1);

  const trackId = activePlaylist?.id;
  const trackName = activePlaylist?.name;
  //search params for fetching data
  const searchParams = useToken();

  //store the colors from album cover
  const fetchColor = async () => {
    prominent(activePlaylist?.images[0]?.url, {
      format: 'hex',

      amount: 5,
    }).then(color => {
      setColors(color);
    });
  };

  const getCatTracks = async () => {
    await fetch(`https://api.spotify.com/v1/playlists/${trackId}`, searchParams)
      .then(res => res.json())
      .then(res => {
        console.log('active', res);
        let timeCounter = 0;
        res.tracks.items.map(track => {
          timeCounter += track.track.duration_ms;
          const durationTime = msToTime(timeCounter);
          setDuration(durationTime[0]);
          return durationTime;
        });
        dispatch({
          type: 'SET_TRACKS',
          tracks: res,
        });
      });
  };

  useEffect(() => {
    fetchColor();
    window.scrollTo(0, 0);
    if (trackId) {
      getCatTracks();
    }
  }, []);

  // handle selected track to be active and lost focus by click outside of playlist
  const ref = useRef(null);
  useEffect(() => {
    const handleOutsideClick = e => {
      if (!ref?.current?.contains(e.target)) {
        setIsActive(-1);
      }
    };
    const timeoutId = setTimeout(() => {
      document.addEventListener('click', handleOutsideClick, false);
    }, 0);
    return () => {
      clearTimeout(timeoutId);
      document.removeEventListener('click', handleOutsideClick, false);
    };
  }, [isActive]);

  return (
    <div className={classes.main} translate="no">
      {tracks && colors && activePlaylist && (
        <div>
          <Bouncer dependencies={[activePlaylist]} />
          <div className={classes.headerNav}>The top nav</div>
          <div
            className={classes.header}
            style={{
              backgroundImage: `linear-gradient(to bottom left, ${colors[3]},  ${colors[4]})`,
            }}
          >
            <img src={activePlaylist.images[0].url} alt="track_image" />
            <div>
              <h2>{trackName}</h2>
              <div className={classes.headerInfo}>
                <p>{activePlaylist.description}</p>
                <div>
                  <NavLink
                    className={classes.profileLink}
                    to="/profile"
                    onClick={() => {
                      dispatch({
                        type: 'SET_PROFILE_ID',
                        profileID: activePlaylist.owner.id,
                      });
                    }}
                  >
                    {activePlaylist.owner.display_name}
                  </NavLink>
                  <span></span>
                  <p>{tracks.followers.total.toLocaleString()} likes </p>
                  <span></span>
                  <p>about {duration}</p>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className={classes.mainContainer}>
              <div className={classes['song-info']}>
                <div className={classes['song-title']}>
                  <div>#</div>
                  <div>TITLE</div>
                </div>
                <div className={classes['song-album']}>ALBUM</div>
                <div className={classes['song-release']}>RELEASE DATE</div>
                <div className={classes['song-time']}>
                  <FontAwesomeIcon icon={faClock} />
                </div>
              </div>
              {tracks.tracks.items?.map((track, index) => {
                return (
                  <div
                    key={index}
                    onClick={e => {
                      e.stopPropagation();
                      setIsActive(index);
                    }}
                    className={`${isActive === index ? classes.active : ''} ${
                      classes['playlist-container']
                    } `}
                  >
                    <div className={classes.playlistInfo} key={index}>
                      <div className={classes.trackImg}>
                        <div>{index + 1}</div>
                        <img
                          src={track.track.album.images[2].url}
                          alt="album_image"
                        />
                      </div>
                      <div className={classes.trackInfo}>
                        <NavLink
                          className={classes['track-nav']}
                          to="/single"
                          onClick={() => {
                            dispatch({
                              type: 'SET_SINGLE_TRACK',
                              singleTrack: track.track,
                            });
                          }}
                        >
                          {track.track.name}
                        </NavLink>
                        <div>
                          {' '}
                          {track.track.artists.map((artist, index) => {
                            return (
                              <NavLink
                                className={classes['track-navName']}
                                to="/artist"
                                key={index}
                                onClick={() => {
                                  dispatch({
                                    type: 'SET_ARTIST_ID',
                                    artistId: artist.id,
                                  });
                                }}
                              >
                                {(index ? ', ' : '') + artist.name}
                              </NavLink>
                            );
                          })}{' '}
                        </div>
                      </div>
                    </div>
                    <div className={classes['album-info']}>
                    <NavLink
                      to='/album'
                      className={classes['album-name']}
                      state={{album: track.track.album}}
                    >
                      {track.track.album.name}
                    </NavLink>
                    </div>
                    <div className={classes['album-date']}>
                      {track.track.album.release_date}
                    </div>{' '}
                    <div className={classes['track-duration']}>
                      {msToTime(track.track.duration_ms)[1]}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
