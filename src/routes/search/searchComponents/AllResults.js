import React from 'react';
import general from './GeneralStyle.module.css';
import classes from './AllResults.module.css';

export default function AllResults({ categories }) {
  console.log(categories);
  return (
    <div className={general.main}>
      <div>
        <h4>Top Results</h4>
        <div className={classes['top-artist']}>
          <img
            src={categories.artists?.items[0].images.at(-1).url}
            alt="artist_image"
          />

          <h3 style={{ color: 'white' }}>
            {' '}
            {categories.artists?.items[0].name}{' '}
          </h3>
        </div>

        <div>
          <h3>Songs</h3>
        </div>
      </div>
    </div>
  );
}
