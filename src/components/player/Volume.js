import axios from "axios";
import React, { useContext } from "react";

import MainContext from "../../context/MainContext.js";

export default function Volume() {
  const [{ hashToken }, DISPATCH] = useContext(MainContext);
  const setVolume = async e => {
    await axios.put(
      "https://api.spotify.com/v1/me/player/volume",
      {},
      {
        params: {
          volume_percent: parseInt(e.target.value),
        },
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + hashToken,
        },
      }
    );
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "flex-end",
        alignContent: "center",
      }}
    >
      <input
        type="range"
        onMouseUp={e => setVolume(e)}
        min={0}
        max={100}
        style={{
          width: "7rem",
          borderRadius: "2rem",
          height: ".3rem",
          color: "maroon",
        }}
      />
    </div>
  );
}
