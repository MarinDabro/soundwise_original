import React, {useState, useContext} from 'react'
import classes from '../../category-list/CategoryTracks.module.css'
import msToTime from '../../../functions/timer';
import DisplayContext from '../../../context/DisplayContext';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-regular-svg-icons';


export default function SongsResults({tracks}) {
    console.log(tracks);
    const [isActive, setIsActive] = useState(-1);
    const [display, dispatch] = useContext(DisplayContext);

  return (
    <div className={classes.main}>
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
            {tracks?.items?.map((track, index) => {
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
                        <img
                          src={track.album.images[2].url}
                          alt="playlist_image"
                        />
                      }
                    </div>
                    <div className={classes.trackInfo}>
                      <NavLink
                        className={classes['track-nav']}
                        to="/single"
                        onClick={() => {
                          dispatch({
                            type: 'SET_SINGLE_TRACK',
                            singleTrack: track,
                          });
                        }}
                      >
                        {track.name}
                      </NavLink>
                      <div>
                        {' '}
                        {track.artists.map((artist, index) => {
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
                              {(index ? ',' : '') + artist.name}
                            </NavLink>
                          );
                        })}{' '}
                      </div>
                    </div>
                  </div>
                  <div className={classes['album-info']}>
                    <div>{track.album.name}</div>
                  </div>
                  <div className={classes['album-date']}>
                    {track.album.release_date}
                  </div>{' '}
                  <div className={classes['track-duration']}>
                    {msToTime(track.duration_ms)[1]}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    

  )
}
