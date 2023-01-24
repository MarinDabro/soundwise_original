import React, { useContext } from "react";
import { useEffect, useState } from "react";
import { useToken } from "../../spotify.js";
import DisplayContext from "../../context/DisplayContext.js";
import style from "../MusicBox.module.css";
import classes from "./CategoryTracks.module.css";
import { NavLink, Outlet } from "react-router-dom";

import { prominent } from "color.js";
/* 
  const img =
    "https://live.staticflickr.com/65535/50237066832_72c7290c5c_c.jpg";
  useEffect(() => {
    const fetchColor = async () => {
      prominent(favicon, { format: "hex", amount: 5 }).then(color => {
        setColors(color);
      });
    };
    fetchColor();
  }, []);
  console.log(img);

  return (
    <dir>
      {colors && (
        <div style={{ backgroundColor: colors[0] }}>
          <img src={img} alt="/" />
          <img src={favicon} alt="/" />
        </div>
      )}
    </dir>
  );
} */

export default function CategoryTracks(props) {
  const [display, dispatch] = useContext(DisplayContext);
  const { tracks, activePlaylist } = display;
  const [colors, setColors] = useState(null);

  //store the colors from album cover
  useEffect(() => {
    const fetchColor = async () => {
      prominent(activePlaylist.images[0].url, {
        format: "hex",
        amount: 5,
      }).then(color => {
        setColors(color);
      });
    };
    fetchColor();
  }, []);
  console.log(colors);

  /*  console.log(playLists);
  console.log(tracks);
  console.log(catName);
  console.log(catId);
  console.log(trackId);
  console.log(trackName); */
  const trackId = activePlaylist.id;
  const trackName = activePlaylist.name;

  const searchParams = useToken();

  const getCatTracks = async () => {
    await fetch(`https://api.spotify.com/v1/playlists/${trackId}`, searchParams)
      .then(res => res.json())
      .then(res =>
        dispatch({
          type: "SET_TRACKS",
          tracks: res,
        })
      );
  };
  useEffect(() => {
    if (trackId) {
      getCatTracks();
      fetch(`https://api.spotify.com/v1/playlists/${trackId}`, searchParams)
        .then(res => res.json())
        .then(res => console.log(res));
    }
  }, []);

  return (
    <div className={classes.main}>
      {tracks && colors && (
        <div>
          <div className={classes.headerNav}>The top nav</div>
          <div
            className={classes.header}
            style={{ backgroundColor: colors[4] }} //set background color to album cover colors set
          >
            <img src={activePlaylist.images[0].url} alt="track_image" />
            <div>
              <h2>{trackName}</h2>
              <p>{activePlaylist.description}</p>
              <p>{tracks.followers.total}</p>
              <NavLink to="/profile">Spotify</NavLink>
            </div>
          </div>
          <div>
            {tracks?.tracks?.items.map((track, index) => {
              return (
                <div className={classes.trackInfo} key={index}>
                  <div>{track.track.name}</div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
