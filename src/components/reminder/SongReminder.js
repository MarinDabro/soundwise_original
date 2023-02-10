import React, { useContext } from "react";
import classes from "./SongReminder.module.css";

import { loginUrl } from "../../spotify";
import DisplayContext from "../../context/DisplayContext.js";
import songImg from "../../media/headphones-gradient.png";
export default function SongReminder() {
  const [{ songImage }, dispatch] = useContext(DisplayContext);
  return (
    songImage && (
      <div translate="no" className={classes.main}>
        <div className={classes.reminderBox}>
          <div className={classes.songImage}>
            <img src={songImage.images[1].url} alt="/song_image" />
          </div>
          <div className={classes.reminderText}>
            <h2>Start listening with a free Spotify account</h2>
            <a href={loginUrl}>LOGIN TO SPOTIFY</a>
            <button
              onClick={() => {
                dispatch({
                  type: "SET_SONG_REMINDER",
                  songReminder: false,
                });
              }}
            >
              Not now
            </button>
          </div>
        </div>
      </div>
    )
  );
}
