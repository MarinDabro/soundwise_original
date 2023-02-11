import React from "react";
import "./musicControls.css";
/* import { IconContext } from "react-icons";
import { FaPause } from "react-icons/fa";
import { IoPlaySkipBack, IoPlaySkipForward, IoPlay } from "react-icons/io5"; */

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faBackwardStep,
  faForwardStep,
  faShuffle,
  faRepeat,
  faPause,
} from "@fortawesome/free-solid-svg-icons";

export default function Controls({
  isPlaying,
  setIsPlaying,
  handleNext,
  handlePrev,
}) {
  return (
    <div className="controls-wrapper flex">
      <div className="action-btn flex" onClick={handlePrev}>
        <FontAwesomeIcon icon={faBackwardStep} />
      </div>
      <div
        className={
          isPlaying ? "play-pause-btn flex active" : "play-pause-btn flex"
        }
        onClick={() => setIsPlaying(!isPlaying)}
      >
        {isPlaying ? (
          <FontAwesomeIcon icon={faPause} />
        ) : (
          <FontAwesomeIcon icon={faPlay} />
        )}
      </div>
      <div className="action-btn flex" onClick={handleNext}>
        <FontAwesomeIcon icon={faForwardStep} />
      </div>
    </div>
  );
}
