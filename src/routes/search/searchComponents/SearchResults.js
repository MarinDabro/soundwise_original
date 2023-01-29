import React from 'react';
import allResults from './allResults';

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
    
    return <allResults categories= {categories}/>
  }

  
  
};

export default SearchResults;
