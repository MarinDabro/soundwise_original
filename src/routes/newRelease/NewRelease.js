import React, { useEffect, useContext } from "react";
import classes from "../MusicBox.module.css";
import MainContext from "../../context/MainContext";
import DisplayContext from "../../context/DisplayContext.js";
import style from "../MusicBox.module.css";
import { NavLink, Outlet } from "react-router-dom";

export default function NewRelease(props) {
  const [STATE, DISPATCH] = useContext(MainContext);
  const [display, dispatch] = useContext(DisplayContext);

  const { newRelease, token } = STATE;
  useEffect(() => {
    async function getNewRelease() {
      await fetch("https://api.spotify.com/v1/browse/new-releases?&limit=12", {
        method: "GET",
        accept: "application/json",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then(res => res.json())
        .then(res => {
          DISPATCH({
            type: "SET_NEW_RELEASE",
            newRelease: res,
          });
        });
    }
    getNewRelease();
  }, []);

  return (
    <div className={classes.main}>
      <h2>New Releases</h2>
      {newRelease && (
        <div className={classes.albumContainer}>
          {newRelease.albums.items.map((album, index) => {
            return (
              <div key={index} className={classes.albumBox}>
                <NavLink
                  to="/album"
                  onClick={() => {
                    dispatch({
                      type: "SET_ALBUM",
                      album: album,
                    });
                    dispatch({
                      type: "SET_ALBUM_ID",
                      albumId: album.id,
                    });
                    dispatch({
                      type: "SET_RELEASE_DATE",
                      releaseDate: album.release_date,
                    });
                    dispatch({
                      type: "SET_ALBUM_IMAGE",
                      albumImg: album.album.images,
                    });
                  }}
                  className={style.albumBox}
                >
                  <div className={classes.albumImage}>
                    <img src={album.images[1].url} alt="/artist_image" />
                  </div>
                  <div className={classes.albumName}>{album.name}</div>
                  <div className={classes.artistName}>
                    BY: {album.artists[0].name}
                  </div>
                </NavLink>
              </div>
            );
          })}
        </div>
      )}
      <Outlet />

      <h2>Featured Playlists</h2>
    </div>
  );
}
