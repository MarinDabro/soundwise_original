import React, { useState, useEffect } from "react";
import { useToken } from "../../spotify.js";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import style from "../MusicBox.module.css";

export default function RelatedArtists({ artistId }) {
  const searchParams = useToken();
  const navigate = useNavigate();
  const [relatedArtist, setRelatedArtist] = useState(null);

  const getRelatedArtists = async () => {
    await fetch(
      `https://api.spotify.com/v1/artists/${artistId}/related-artists`,
      searchParams
    )
      .then(res => res.json())
      .then(res => {
        if (res.error) {
          navigate("/");
        } else {
          setRelatedArtist(res);
        }
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
              {relatedArtist?.artists?.map((artist, index) => {
                return (
                  <NavLink
                    to="/artist"
                    state={{artist}}
                    key={index}
                    className={style.albumBox}
                    onClick={() => {
                      const routes = document.getElementById('routes')
                      routes.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                      })
                    }}
                  >
                    <div className={style.albumImage}>
                      <img
                        src={artist.images[1].url}
                        alt="/related_artists_image"
                      />
                    </div>
                    <div className={style.albumName}>{artist.name}</div>
                    <div className={style.artistName}>
                      {artist.followers.total.toLocaleString()} likes
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
