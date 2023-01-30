import React, { useContext } from 'react';
import { useEffect, useState } from 'react';
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
import { useRef } from 'react';

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
    await fetch(`https://api.spotify.com/v1/${activePlaylist?.type}s/${trackId}`, searchParams)
      .then(res => res.json())
      .then(res => {
        console.log('active', res)
        let timeCounter = 0;
        const realMap = res.tracks ? res.tracks : res.chapters
        realMap.items.map(track => {
          timeCounter += track.duration_ms ? track.duration_ms : track.track.duration_ms;
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
    if (trackId) {
      getCatTracks();
    }
  }, [activePlaylist]);

  const realTracks = tracks?.tracks ? tracks?.tracks : tracks?.chapters
  const realArtists = activePlaylist?.artists ? activePlaylist?.artists : activePlaylist?.authors
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
    <div className={classes.main}>
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
                {
                  activePlaylist.type === 'playlist' ?
                    <div>
                      <NavLink 
                        className={classes.profileLink} 
                        to="/profile" 
                        onClick={() => {
                          dispatch({
                            type: 'SET_PROFILE_ID',
                            profileID: activePlaylist.owner.id
                          })
                        }}>
                        {activePlaylist.owner.display_name}
                      </NavLink>
                      <span></span>
                      <p>{tracks?.followers?.total} likes </p>
                      <span></span>
                      <p>about {duration}</p>
                    </div>
                  : 
                    realArtists.map((artist, index) => {
                      console.log('artist', artist)
                      return (
                        <NavLink
                          className={classes.profileLink}
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
                    })
                }
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
                {activePlaylist.type === 'playlist' ? <div className={classes['song-album']}>ALBUM</div> : ''}
                {activePlaylist.type === 'playlist' ? <div className={classes['song-release']}>RELEASE DATE</div> : ''}
                
                <div className={classes['song-time']}>
                  <FontAwesomeIcon icon={faClock} />
                </div>
              </div>
              {realTracks?.items?.map((track, index) => {
                const realTracks2 = track.track ? track.track : track
                const playlistCheck = track.track ? true : false
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
                    /*       onFocus={e => e.target.classList.add(classes.active)}
                    onBlur={e => e.target.classList.remove(classes.active)} */
                  >
                    <div className={classes.playlistInfo} key={index}>
                      <div className={classes.trackImg}>
                        <div>{index + 1}</div>
                        { 
                          playlistCheck ?
                          <img
                            src={track.track.album.images[2].url}
                            alt="album_image"
                          />
                          : ''
                        }
                      </div>
                      <div className={classes.trackInfo}>
                        <NavLink
                          className={classes['track-nav']}
                          to="/single"
                          onClick={() => {
                            dispatch({
                              type: 'SET_SINGLE_TRACK',
                              singleTrack: realTracks2,
                            });
                          }}
                        >
                          {playlistCheck ? track.track.name : track.name}
                        </NavLink>
                        <div>
                          {' '}
                          {realTracks2.artists.map((artist, index) => {
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
                        <NavLink to={track.track.album.album_type === 'single' ? '/single': 'activePlaylist'} className={classes['album-info']}
                          onClick={() => {
                            if (track.track.album.album_type === 'single') {
                              dispatch({
                                type: 'SET_SINGLE_TRACK',
                                singleTrack: track.track.album
                              })
                              dispatch({
                                type: 'SET_SINGLE_ID',
                                singleTrack: track.track.id
                              })
                            } else {
                              dispatch({
                                type: 'SET_ACTIVE_PLAYLIST',
                                activePlaylist: track.track.album
                              })
                            }
                          }}
                        >
                          <div>{playlistCheck ? track.track.album.name : ''}</div>
                        </NavLink>
                        <div className={classes['album-date']}>
                          {playlistCheck ? track.track.album.release_date : ''}
                        </div>{' '}
                    <div className={classes['track-duration']}>
                      {msToTime(realTracks2.duration_ms)[1]}
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
