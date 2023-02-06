import React, { useContext } from "react";
import axios from "axios";
import PlayerContext from "../../../context/PlayerContext";
import MainContext from "../../../context/MainContext.js";

const PlayTrack = () => {
  const [{ hashToken }, DISPATCH] = useContext(MainContext);
  const [player, playerDispatch] = useContext(PlayerContext);
  const { context } = player;
  const context_uri = context.uri;

  const fetchData = async () => {
    await axios.put(
      `https://api.spotify.com/v1/me/player/play`,
      {
        context_uri,
        offset: {
          position: context.track_number - 1,
        },
        position_ms: 0,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + hashToken,
        },
      }
    );

    playerDispatch({ type: "SET_PLAYER_STATE", playerState: true });
  };
  fetchData();
  return <React.Fragment></React.Fragment>;
};

export default PlayTrack;
