import React, { useEffect, useState, useContext } from "react";
import "./player.css";
import { useLocation } from "react-router-dom";
import axios from "axios";
import MainContext from "../../context/MainContext";
import AudioPLayer from "./AudioPlayer";

export default function MyPlayer() {
  const [{ login, user, hashToken }, DISPATCH] = useContext(MainContext);
  const location = useLocation();
  const [tracks, setTracks] = useState([]);
  const [currentTrack, setCurrentTrack] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (location.state) {
      axios
        .get(
          "https://api.spotify.com/v1/playlists/" +
            location.state?.id +
            "/tracks",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + hashToken,
            },
          }
        )
        .then(res => {
          setTracks(res.data.items);
          setCurrentTrack(res.data?.items[0]?.track);
        });
    }
  }, [location.state]);

  useEffect(() => {
    setCurrentTrack(tracks[currentIndex]?.track);
  }, [currentIndex, tracks]);

  return (
    <div className="screen-container flex">
      <div className="left-player-body">
        <AudioPLayer
          currentTrack={currentTrack}
          total={tracks}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
        />
      </div>
    </div>
  );
}
