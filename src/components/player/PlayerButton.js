import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { faBackwardStep } from '@fortawesome/free-solid-svg-icons';
import { faForwardStep } from '@fortawesome/free-solid-svg-icons';
import { faShuffle } from '@fortawesome/free-solid-svg-icons';
import { faRepeat } from '@fortawesome/free-solid-svg-icons';



import classes from './PlayerButton.module.css';
export default function PlayerButton() {
  return (
    <div className={classes.player}>
      <div className={classes['shuffle-button']}>
        <FontAwesomeIcon icon={faShuffle} />
      </div>
      <div className={classes['backward-button']}>
        <FontAwesomeIcon icon={faBackwardStep} />
      </div>
      <div className={classes['play-button']}>
        <FontAwesomeIcon className={classes['player-icon']} icon={faPlay} />
      </div>
      <div className={classes['forward-button']}>
        <FontAwesomeIcon icon={faForwardStep} />
      </div>
      <div className={classes['repeat-button']}>
      <FontAwesomeIcon icon= {faRepeat} />
      </div>
    </div>
  );
}
