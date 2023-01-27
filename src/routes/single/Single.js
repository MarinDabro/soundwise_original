import React, { useContext } from "react";
import { useEffect, useState } from "react";
import { useToken } from "../../spotify.js";
import DisplayContext from "../../context/DisplayContext.js";
import classes from "./Single.module.css";
import { NavLink, Outlet } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-regular-svg-icons";

import { prominent } from "color.js";
import Bouncer from "../../functions/bouncer.js";
import { useRef } from "react";

export default function Single() {
  const [display, dispatch] = useContext(DisplayContext);
  const { tracks, activePlaylist } = display;
  const [colors, setColors] = useState(null);
  const [duration, setDuration] = useState("");
  const [isActive, setIsActive] = useState(-1);

  const trackId = activePlaylist?.id;
  const trackName = activePlaylist?.name;
  //search params for fetching data
  const searchParams = useToken();

  //convert duration time to hours and minutes
  function msToTime(ms) {
    let d, h, m, s;

    s = Math.floor(ms / 1000);
    m = Math.floor(s / 60);
    s = s % 60;
    h = Math.floor(m / 60);
    m = m % 60;
    d = Math.floor(h / 24);
    h = h % 24;
    h += d * 24;
    const duration = h + " h " + m + " min";
    if (s < 10) {
      s = "0" + s;
    }
    const trackTime = m + ":" + s;
    return [duration, trackTime];
  }

  //store the colors from album cover
  const fetchColor = async () => {
    prominent(activePlaylist?.images[0]?.url, {
      format: "hex",

      amount: 5,
    }).then(color => {
      setColors(color);
    });
  };

  const getCatTracks = async () => {
    await fetch(`https://api.spotify.com/v1/playlists/${trackId}`, searchParams)
      .then(res => res.json())
      .then(res => {
        let timeCounter = 0;
        res.tracks.items.map(track => {
          timeCounter += track.track.duration_ms;
          const durationTime = msToTime(timeCounter);
          setDuration(durationTime[0]);
          return durationTime;
        });
        dispatch({
          type: "SET_TRACKS",
          tracks: res,
        });
      });
  };

  useEffect(() => {
    if (trackId) {
      getCatTracks();
      fetchColor();
    }
    fetch(
      `https://www.stands4.com/services/v2/lyrics.php?uid=1001&tokenid=tk324324&term=forever%20young&artist=Alphaville&format=xml`
    )
      .then(res => res.json())
      .then(res => console.log(res));
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
      document.addEventListener("click", handleOutsideClick, false);
    }, 0);
    return () => {
      clearTimeout(timeoutId);
      document.removeEventListener("click", handleOutsideClick, false);
    };
  }, [isActive]);

  return (
    <div className={classes.main}>
      {tracks && colors && activePlaylist && (
        <div>
          <Bouncer dependencies={[activePlaylist]} />
          <div className={classes.headerNav}>The SINGLE page</div>
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
                  <NavLink className={classes.profileLink} to="/profile">
                    Spotify
                  </NavLink>
                  <span></span>
                  <p>{tracks.followers.total} likes </p>
                  <span></span>
                  <p>about {duration}</p>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className={classes.mainContainer}>
              <div className={classes["song-info"]}>
                <div className={classes["song-title"]}>
                  <div>#</div>
                  <div>TITLE</div>
                </div>
                <div className={classes["song-album"]}>ALBUM</div>
                <div className={classes["song-release"]}>RELEASE DATE</div>
                <div className={classes["song-time"]}>
                  <FontAwesomeIcon icon={faClock} />
                </div>
              </div>
              {tracks?.tracks?.items.map((track, index) => {
                return (
                  <div
                    key={index}
                    onClick={e => {
                      e.stopPropagation();
                      setIsActive(index);
                    }}
                    className={`${isActive === index ? classes.active : ""} ${
                      classes["playlist-container"]
                    } `}
                    /*       onFocus={e => e.target.classList.add(classes.active)}
                    onBlur={e => e.target.classList.remove(classes.active)} */
                  >
                    <div className={classes.playlistInfo} key={index}>
                      <div className={classes.trackImg}>
                        <div>{index + 1}</div>
                        {
                          <img
                            src={track.track.album.images[2].url}
                            alt="playlist_image"
                          />
                        }
                      </div>
                      <div className={classes.trackInfo}>
                        <NavLink
                          to="/single"
                          onClick={() => {
                            dispatch({
                              type: "SET_SINGLE_TRACK",
                              singleTrack: track,
                            });
                          }}
                        >
                          {track.track.name}
                        </NavLink>
                        <div>
                          {" "}
                          {track.track.artists.map((artist, index) => {
                            return (
                              <NavLink
                                to="/artist"
                                key={index}
                                onClick={() => {
                                  dispatch({
                                    type: "SET_ARTIST_ID",
                                    artistId: artist.id,
                                  });
                                }}
                              >
                                {(index ? "," : "") + artist.name}
                              </NavLink>
                            );
                          })}{" "}
                        </div>
                      </div>
                    </div>
                    <div className={classes["album-info"]}>
                      <div>{track.track.album.name}</div>
                    </div>
                    <div className={classes["album-date"]}>
                      {track.track.album.release_date}
                    </div>{" "}
                    <div className={classes["track-duration"]}>
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
