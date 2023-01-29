import React from 'react';
import AllResults from './AllResults.js';
import PlaylistResults from './PlaylistResults';

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
  }
 
  console.log(categories);

  if(activeType.length > 3){
    
    return <AllResults categories={categories}/>
  } else if (activeType == ['playlists']) {
    return <div><PlaylistResults playlists={playlists}/></div>
  }

  
  
};

export default SearchResults;
