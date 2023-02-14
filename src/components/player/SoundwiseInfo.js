import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import logo from "../../media/headphones-gradient.png";
import classes from "./Player.module.css";

export default function SoundwiseInfo() {
  const soundwise = {
    id: "1",
    name: "soundwise",
    artists: ["Thanh Le", "Linda", "Basheer", "Marin"],
    image: logo,
  };
  return (
    <div>
      <div className={classes["track-container"]} translate="no">
        <div className={classes["track-info"]}>
          <div className={classes["track-image"]}>
            {<img src={soundwise.image} alt="/artist_image" />}
          </div>
        </div>
        <div className={classes["track-description"]}>
          <div className={classes["track-name"]} to="/single">
            {soundwise.name}
          </div>
          <div className={classes["artist-name"]} to="/artist">
            {soundwise.artists.join(", ")}
          </div>
        </div>
        <div>
          <FontAwesomeIcon icon={faHeart} />
        </div>
      </div>
    </div>
  );
}
