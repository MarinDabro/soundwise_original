import React, { useState } from "react";
import { useEffect } from "react";
import { useToken } from "../../spotify.js";
import classes from "./CategoryList.module.css";
import style from "../MusicBox.module.css";

export default function CategoryList({ catId, catName }) {
  const searchParams = useToken();
  const [playlist, setPlaylist] = useState(null);

  const getCatPlaylist = async () => {
    await fetch(
      `https://api.spotify.com/v1/browse/categories/${catId}/playlists`,
      searchParams
    )
      .then(res => res.json())
      .then(res => setPlaylist(res));
  };
  useEffect(() => {
    getCatPlaylist();
  }, []);

  return (
    <div className={style.main}>
      {playlist && (
        <div>
          <h3> {catName} </h3>
          <div className={style.albumContainer}>
            {playlist.playlists.items.map((playlist, index) => {
              return (
                <div key={index} className={style.albumBox}>
                  <div className={style.albumImage}>
                    <img src={playlist.images[0].url} alt="/ playlist_image" />
                  </div>
                  <div className={style.albumName}>{playlist.description}</div>
                  <div className={style.artistName}>{playlist.name}</div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
