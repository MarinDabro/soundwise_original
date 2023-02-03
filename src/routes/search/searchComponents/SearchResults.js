<<<<<<< HEAD
import React from "react";
import AllResults from "./AllResults.js";
import ArtistsResults from "./ArtistsResults.js";
import PlaylistResults from "./PlaylistResults.js";
import SongsResults from "./SongsResults.js";
=======
import React from 'react';
import AllResults from './AllResults.js';
import ArtistsResults from './ArtistsResults.js';
import PlaylistResults from './PlaylistResults.js';
import SongsResults from './SongsResults.js';
import TracksMap from '../../../components/tracksMap/TracksMap.js'
>>>>>>> 6e03a5ea631f579fb537e3b964a93ec10ad95ecf
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
<<<<<<< HEAD
  };

  return (
    <div>
      {activeType === "album,artist,playlist,track,show,episode,audiobook" ? (
        <AllResults categories={categories} />
      ) : (
        ""
      )}
=======
  }
 

  return (
    <div>
      {activeType === "album,artist,playlist,track,show,episode,audiobook" ? <AllResults categories={categories}/> : ''}
      {activeType === 'playlist' && playlists ? <PlaylistResults playlists={playlists}/> : ''}
      {activeType === 'album' && albums ? <PlaylistResults playlists={albums} /> : '' }
      {activeType === 'track' && tracks ? <TracksMap target={tracks?.items} picture={true} artists={true} album={true} release={true}/> : '' }
      {activeType === 'artist' && artists ? <ArtistsResults artists={artists?.items} /> : '' }
       {/* {activeType === 'episode,show' ? <PlaylistResults playlists={episodes?.items} /> : '' } */}
>>>>>>> 6e03a5ea631f579fb537e3b964a93ec10ad95ecf

      {activeType === "playlist" ? (
        <PlaylistResults playlists={playlists} />
      ) : (
        ""
      )}
      {activeType === "album" ? <PlaylistResults playlists={albums} /> : ""}
      {activeType === "track" ? <SongsResults tracks={tracks} /> : ""}
      {activeType === "artist" ? (
        <ArtistsResults artists={artists?.items} />
      ) : (
        ""
      )}
      {/* {activeType === 'episode,show' ? <PlaylistResults playlists={episodes?.items} /> : '' } */}
    </div>
  );
};

export default SearchResults;
