
import React, { useState } from "react";
import { useEffect } from "react";
import { useToken } from "../../spotify.js";

export default function CategoryTracks() {
    const searchParams = useToken();
    const getCatTracks = async () => {
        await fetch(
           'https://api.spotify.com/v1/playlists/37i9dQZF1DX4jP4eebSWR9/tracks',
          searchParams
        )
          .then(res => res.json())
          .then(res => console.log(res));
      };
      useEffect(() => {
        getCatTracks();
      }, []);
    
    
  return (
    <div>CategoryTracks</div>
  )
}
