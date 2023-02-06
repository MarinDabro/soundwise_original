import React, { useContext, useState } from "react";
import classes from "./Player.module.css";
import PlayerContext from "../../context/PlayerContext";
/* import { useToken } from '../../spotify';
import getDetails from '../../functions/getDetails.js';  */
import PlayerTrackInfo from "./PlayerTrackInfo.js";

const Player = () => {
  const [player, playerDispatch] = useContext(PlayerContext);
  /* const searchParams = useToken();  */
  //console.log("context", context);
  // console.log("trackInfo", trackInfo);
  //console.log("artistInfo", artistInfo);
  //console.log("popularTrack", popularTrack);
  /*   const songName = realTrack?.name; */

  return (
    <div className={classes.player}>
      <PlayerTrackInfo />
    </div>
  );
};
export default Player;
