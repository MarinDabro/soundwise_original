import React from 'react';
import AllResults from './AllResults.js';

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
 


  console.log(albums);
  if(activeType.length > 3){
    
    return <div><AllResults categories= {categories}/></div>
  }

  
  
};

export default SearchResults;
