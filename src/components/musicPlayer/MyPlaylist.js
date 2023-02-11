import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import MainContext from "../../context/MainContext";
import "./myPlaylist.css";

export default function MyPlaylist() {
  const [STATE, DISPATCH] = useContext(MainContext);
  const { login, user, hashToken } = STATE;

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
        console.log(response);
        setPlaylists(response.data.items);
      });
  }, [hashToken]);

  const navigate = useNavigate();

  const playPlaylist = id => {
    navigate("/myPlayer", { state: { id: id } });
  };

  return (
    <div className="screen-container">
      <div className="playlist-body">
        <h1 style={{ color: "white" }}>My Playlist</h1>
        {playlists?.map(playlist => (
          <div
            className="playlist-card"
            key={playlist.id}
            onClick={() => playPlaylist(playlist.id)}
          >
            <img
              src={playlist?.images[0]?.url}
              className="playlist-image"
              alt="Playlist-Art"
            />
            <p className="playlist-title">{playlist.name}</p>
            <p className="playlist-subtitle">{playlist.tracks.total} Songs</p>
          </div>
        ))}
      </div>
    </div>
  );
}
