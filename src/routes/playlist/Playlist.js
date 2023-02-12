import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";

import MainContext from "../../context/MainContext";
import classes from "./Playlist.module.css";

export default function MyPlaylist() {
  const [STATE, DISPATCH] = useContext(MainContext);
  const { login, user, hashToken } = STATE;

  const [playlists, setPlaylists] = useState(null);

  useEffect(() => {
    if (hashToken) {
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
    }
  }, [hashToken]);

  const navigate = useNavigate();

  return (
    hashToken && (
      <div className={classes["screen-container"]} translate="no">
        <div className={classes["playlist-body"]}>
          <h1 style={{ color: "white" }}>My Playlist</h1>

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
