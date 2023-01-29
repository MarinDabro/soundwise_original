import React, { useState, useContext } from "react";
import { useEffect } from "react";
import { useToken } from "../../spotify.js";
import style from "../MusicBox.module.css";
import { NavLink, Outlet } from "react-router-dom";

import DisplayContext from "../../context/DisplayContext.js";

export default function RelatedArtists({ artistId }) {
  const searchParams = useToken();
  const [display, dispatch] = useContext(DisplayContext);
  const [albums, setAlbums] = useState(null);

  const [relatedArtist, setRelatedArtist] = useState(null);

  const getRelatedArtists = async () => {
    await fetch(
      `https://api.spotify.com/v1/artists/${artistId}/related-artists`,
      searchParams
    )
      .then(res => res.json())
      .then(res => {
        setRelatedArtist(res);
      });
  };
  useEffect(() => {
    getRelatedArtists();
  }, []);

  return (
    <div className={style.main}>
      <div>
        {relatedArtist && (
          <div>
            <div className={style.albumContainer}>
              {relatedArtist?.artists?.map((artists, index) => {
                return (
                  <NavLink
                    to="/artist"
                    onClick={() => {
                      dispatch({
                        type: "SET_ARTIST",
                        artist: artists,
                      });
                    }}
                    key={index}
                    className={style.albumBox}
                  >
                    <div className={style.albumImage}>
                      <img
                        src={artists.images[1].url}
                        alt="/related_artists_image"
                      />
                    </div>
                    <div className={style.albumName}>{artists.name}</div>
                    <div className={style.artistName}>
                      {artists.followers.total.toLocaleString()} likes
                    </div>
                  </NavLink>
                );
              })}
            </div>
          </div>
        )}
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
}
