import React, { useState, useEffect, useContext } from "react";
import SpotifyPlayer from "react-spotify-web-playback";
import MainContext from "../../context/MainContext.js";

export default function Dashboard({ trackUri }) {
  /*   console.log("dashboard", props);
   */ const [play, setPlay] = useState(false);
  const [{ hashToken }, DISPATCH] = useContext(MainContext);
  console.log("token for player : ", hashToken);
  /*   const progressBarStyles = {
    width: (props.progress_ms * 100) / props.item.duration_ms + "%",
  }; */
  useEffect(() => setPlay(true), [trackUri]);

  if (!hashToken) return null;
  return (
    <SpotifyPlayer
      token={hashToken}
      showSaveIcon
      callback={state => {
        if (!state.isPlaying) setPlay(false);
      }}
      play={play}
      uris={trackUri ? [trackUri] : []}
    />
  );
}
