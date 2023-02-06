import React, { useContext } from "react";
import PlayerContext from "../../context/PlayerContext";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlayCircle,
  faPauseCircle,
  faSquare,
  faClockFour,
  faXmarkCircle,
  faRectangleList,
} from "@fortawesome/free-regular-svg-icons";
import axios from "axios";
import { useEffect } from "react";
import MainContext from "../../context/MainContext.js";

export default function PlayerControl() {
  const [{ hashToken }, DISPATCH] = useContext(MainContext);

  const [player, playerDispatch] = useContext(PlayerContext);
  const { playState, context, playingTrack } = player;
  const contextUri = context.uri;
  console.log("hashtoken : ", hashToken);
  const headerContent = {
    "Content-Type": "application/json",
    Authorization: "Bearer " + hashToken,
  };

  const changeTrack = async type => {
    await axios.post(
      `https://api.spotify.com/v1/me/player/${type}`,
      {},
      {
        headers: headerContent,
      }
    );
    playerDispatch({
      type: "SET_PLAY_STATE",
      playState: true,
    });

    const response = await axios.get(
      "https://api.spotify.com/v1/me/player/currently-playing",
      {
        headers: headerContent,
      }
    );
    if (response.data !== "") {
      const { item } = response.data;
      const currentPlaying = {
        id: item.id,
        name: item.name,
        artists: item.artists.map(artist => artist.name),
        image: item.album.images[2].url,
      };
      playerDispatch({
        type: "SET_CURRENT_PLAYING",
        currentTrack: currentPlaying,
      });
    } else {
      playerDispatch({
        type: "SET_CURRENT_PLAYING",
        currentTrack: null,
      });
    }
  };
  //function to get play or pause
  const changeState = async () => {
    const state = playState ? "pause" : "play";
    await axios.put(
      `https://api.spotify.com/v1/me/player/${state}`,
      {},
      {
        headers: headerContent,
      }
    );
    playerDispatch({
      type: "SET_PLAY_STATE",
      playState: !playState,
    });
  };

  //get the playing track
  const playTrack = async () => {
    const response = await axios.put(
      `https://api.spotify.com/v1/me/player/play`,
      {
        contextUri,
        offset: {
          position: context.track_number - 1,
        },
        position_ms: 0,
      },
      {
        headers: headerContent,
      }
    );
    if (response.status === 204) {
      const currentPlaying = {
        id: context.id,
        name: context.name,
        artists: context.artists.map(artist => artist.name),
        image: context.album.images[2].url,
      };
      playerDispatch({
        type: "SET_PLAYING_TRACK",
        playingTrack: currentPlaying,
      });
      playerDispatch({
        type: "SET_PLAY_STATE",
        playState: true,
      });
    } else {
      playerDispatch({
        type: "SET_PLAYER_STATE",
        playState: true,
      });
    }
  };

  useEffect(() => {
    playTrack();
  }, [playingTrack]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-around",
        width: "20rem",
      }}
    >
      <div className="shuffle">
        <FontAwesomeIcon
          icon={faSquare}
          style={{ color: "pink", marginLeft: "5px" }}
        />
      </div>
      <div className="previous">
        <FontAwesomeIcon
          icon={faClockFour}
          style={{ color: "pink", marginLeft: "5px" }}
          onClick={() => changeTrack("previous")}
        />
      </div>
      <div className="state">
        {!playState ? (
          <FontAwesomeIcon
            icon={faPlayCircle}
            style={{ color: "pink", marginLeft: "5px" }}
            onClick={changeState}
          />
        ) : (
          <FontAwesomeIcon
            icon={faPauseCircle}
            style={{ color: "pink", marginLeft: "5px" }}
            onClick={changeState}
          />
        )}
      </div>
      <div className="next">
        <FontAwesomeIcon
          icon={faXmarkCircle}
          style={{ color: "pink", marginLeft: "5px" }}
          onClick={() => changeTrack("next")}
        />
      </div>
      <div className="repeat">
        <FontAwesomeIcon
          icon={faRectangleList}
          style={{ color: "pink", marginLeft: "5px" }}
        />
      </div>
    </div>
  );
}
