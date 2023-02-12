import React, { useEffect, useContext } from "react";
import axios from "axios";
import PlayerContext from "../../context/PlayerContext";
import MainContext from "../../context/MainContext.js";
import classes from "./CurrentTrack.module.css";
export default function CurrentTrack() {
  const [{ hashToken }, DISPATCH] = useContext(MainContext);
  const [{ currentPlaying }, playerDispatch] = useContext(PlayerContext);

  const getCurrentTrack = async () => {
    const response = await axios.get(
      "https://api.spotify.com/v1/me/player/currently-playing",
      {
        headers: {
          Authorization: "Bearer " + hashToken,
          "Content-Type": "application/json",
        },
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
          <div className={classes.track}>
            <div className={classes["track__image"]}>
              <img src={currentPlaying.image} alt="currentPlaying" />
            </div>
            <div className={classes["track__info"]}>
              <h4 className={classes["track__name"]}>{currentPlaying.name}</h4>
              <h6 className={classes["track__artists"]}>
                {currentPlaying.artists.join(", ")}
              </h6>
            </div>
          </div>
        )}
      </div>
    )
  );
}
