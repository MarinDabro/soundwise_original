import React, { useEffect, useContext, useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import PlayerContext from "../../context/PlayerContext";
import MainContext from "../../context/MainContext.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
/* import classes from "./CurrentTrack.module.css";
 */ import classes from "./Player.module.css";
export default function CurrentTrack() {
  const [{ hashToken }, DISPATCH] = useContext(MainContext);
  const [{ currentPlaying, context, trackPlayer }, playerDispatch] =
    useContext(PlayerContext);
  const [trackInfo, setTrackInfo] = useState(null);

  const headerParams = {
    Authorization: "Bearer " + hashToken,
    "Content-Type": "application/json",
  };

  const getTrackInfo = async () => {
    if (context) {
      const response = await axios.get(
        `https://api.spotify.com/v1/tracks/${context.id}`,
        {
          headers: headerParams,
        }
      );
      if (response.data !== "") {
        const currentTrack = {
          name: response.data.name,
          artists: response.data.artists.map(artist => artist.name),
          image: response.data.album.images[2].url,
        };
        setTrackInfo(currentTrack);
      }
    }
  };

  useEffect(() => {
    if (trackPlayer) {
      getTrackInfo();
    }
  }, [context]);

  const getCurrentTrack = async () => {
    const response = await axios.get(
      "https://api.spotify.com/v1/me/player/currently-playing",
      {
        headers: headerParams,
      }
    );
    if (response.data !== "") {
      const currentPlaying = {
        id: response.data.item.id,
        name: response.data.item.name,
        artists: response.data.item.artists.map(artist => artist.name),
        image: response.data.item.album.images[2].url,
      };
      DISPATCH({ type: "SET_PLAYING", currentPlaying });
    } else {
      DISPATCH({ type: "SET_PLAYING", currentPlaying: null });
    }
  };

  useEffect(() => {
    getCurrentTrack();
  }, [hashToken, playerDispatch]);
  return (
    hashToken && (
      <div>
        {currentPlaying && (
          <div className={classes["track-container"]}>
            <div className={classes["track-info"]}>
              <div className={classes["track-image"]}>
                {trackPlayer ? (
                  <img src={trackInfo.image} alt="/artist_image" />
                ) : (
                  <img src={currentPlaying.image} alt="/artist_image" />
                )}
              </div>
            </div>
            <div className={classes["track-description"]}>
              <NavLink className={classes["track-name"]} to="/single">
                {trackPlayer ? trackInfo.name : currentPlaying.name}
              </NavLink>
              <NavLink className={classes["artist-name"]} to="/artist">
                {trackPlayer
                  ? trackInfo.artists.join(",")
                  : currentPlaying.artists.join(", ")}
              </NavLink>
            </div>
            <div>
              <FontAwesomeIcon icon={faHeart} />
            </div>
          </div>
        )}
      </div>
    )
  );
}

/*  <div className={classes['track-container']}>
            <div className={classes['track__info']}>
              <div className={classes['track__image']}>
                <img src={currentPlaying.image} alt="currentPlaying" />
              </div>
            </div>
            <div className={classes['track-description']}>
              <div className={classes['track__name']}>
                {currentPlaying.name}
              </div>
              <div className={classes['track__artists']}>
                {currentPlaying.artists.join(', ')}
              </div>
            </div>
          </div> */
