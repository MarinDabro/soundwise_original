import React, { useContext, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import classes from "./Library.module.css";
import playlistImg from "../../media/headphones-gradient.png";
import MainContext from "../../context/MainContext";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";

export default function Library() {
  const [STATE, DISPATCH] = useContext(MainContext);
  const { user, hashToken, playlist } = STATE;

  const [playlists, setPlaylists] = useState(null);

  useEffect(() => {
    axios
      .get("https://api.spotify.com/v1/me/playlists", {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + hashToken,
        },
      })
      .then(function (response) {
        setPlaylists(response.data.items);
      });
  }, [hashToken]);

  const navigate = useNavigate();

  return (
    hashToken && (
      <div className={classes["screen-container"]} translate="no">
        <h1 style={{ color: "white" }}>My Playlist</h1>
        <div className={classes["playlist-body"]}>
          <div className={classes.likedBox}>
            <div>
              <h2> Liked song</h2>
              <h5>0 liked songs</h5>
            </div>
            <div>
              <FontAwesomeIcon
                className={classes["player-icon"]}
                icon={faPlay}
              />
            </div>
          </div>
          {playlists?.map((playlist, id) => (
            <NavLink
              key={id}
              to="/myPlayer"
              state={{ id: playlist.id }}
              className={classes["playlist-card"]}
            >
              <img
                src={playlist?.images[0]?.url}
                className={classes["playlist-image"]}
                alt="Playlist-Art"
              />
              <p className={classes["playlist-title"]}>{playlist.name}</p>
              <p className={classes["playlist-subtitle"]}>
                {playlist.tracks.total} Songs
              </p>
            </NavLink>
          ))}
        </div>
      </div>
    )
  );
}
