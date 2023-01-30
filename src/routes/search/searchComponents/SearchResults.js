import React from 'react';
import AllResults from './AllResults.js';
import PlaylistResults from './PlaylistResults.js';
/* import classes from './SearchResults.module.css'; */
const SearchResults = ({ activeCat, activeType }) => {
  const { albums, artists, audiobooks, episodes, playlists, shows, tracks } =
    activeCat;
  const categories = {
    albums,
    artists,
    audiobooks,
    episodes,
    playlists,
    shows,
    tracks,
  };

  console.log(categories);

  if (activeType === "album,artist,playlist,track,show,episode,audiobook") {
    return (
      <div>
        <AllResults categories={categories} />
      </div>
    );
  } else if (activeType === 'playlist') {
    return (
      <div>
        <PlaylistResults playlists={playlists} />
      </div>
    );
  } else {
    return null;
  }
};

export default SearchResults;
