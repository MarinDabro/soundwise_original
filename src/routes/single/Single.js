import React, { useContext, useRef, useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import parse from "html-react-parser";
/* import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-regular-svg-icons"; */

import { useToken } from "../../spotify.js";
import DisplayContext from "../../context/DisplayContext.js";
import PopularAlbums from "../artist/PopularAlbums.js";
import RelatedArtists from "../artist/RelatedArtists.js";
import classes from "./Single.module.css";

import { prominent } from "color.js";
import Bouncer from "../../functions/bouncer.js";

export default function Single() {
  const [colors, setColors] = useState(null);
  const navigate = useNavigate();
  const { state } = useLocation();
  console.log(state);
  const singleTrack = state.singleTrack;
  const [isActive, setIsActive] = useState(-1);
  const [artistInfo, setArtistInfo] = useState(null);
  const [popularTrack, setPopularTrack] = useState(null);
  const [showMore, setShowMore] = useState(false);
  const [lyrics, setLyrics] = useState("");

  //search params for fetching data{
  const searchParams = useToken();

  let trackArr = [];
  const artistName = singleTrack?.track.artists[0].name;

  //get the artist Id to fetch artist api
  const artistId = singleTrack.track.artists[0].id;

  //get artist info
  const getArtistInfo = async () => {
    await fetch(
      `https://api.spotify.com/v1/artists/${artistId}`,
      searchParams
    ).then(res =>
      res.json().then(res => {
        if (res.error) {
          navigate("/");
        } else {
          setArtistInfo(res);
        }
      })
    );
  };
  const getPopularTrack = async () => {
    await fetch(
      `https://api.spotify.com/v1/artists/${artistId}/top-tracks?country=DE&limit=10`,
      searchParams
    )
      .then(res => res.json())
      .then(res => {
        if (res.error) {
          navigate("/");
        } else {
          setPopularTrack(res);
        }
      });
  };

  //change the track array to show more or less
  if (popularTrack) {
    trackArr = showMore
      ? popularTrack?.tracks.slice(0, 10)
      : popularTrack?.tracks.slice(0, 5);
  }

  //convert duration time to hours and minutes
  function msToTime(ms) {
    let d, h, m, s;
    s = Math.floor(ms / 1000);
    m = Math.floor(s / 60);
    s = s % 60;
    h = Math.floor(m / 60);
    m = m % 60;
    d = Math.floor(h / 24);
    h = h % 24;
    h += d * 24;
    const duration = h + " h " + m + " min";
    if (s < 10) {
      s = "0" + s;
    }
    const trackTime = m + ":" + s;
    return [duration, trackTime];
  }

  //store the colors from album cover
  const fetchColor = async () => {
    prominent(singleTrack?.track?.album.images[1].url, {
      format: "hex",
      amount: 5,
    }).then(color => {
      setColors(color);
    });
  };

  /*   const getLyrics = async () => {
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "eb2da2699emsh12f40b3a3633c52p172a0ajsn2b0ccc86371d",
        "X-RapidAPI-Host": "genius-song-lyrics1.p.rapidapi.com",
      },
    };

    await fetch(
      "https://genius-song-lyrics1.p.rapidapi.com/search/?q=bad&per_page=10&page=1",
      options
    )
      .then(response => response.json())
      .then(response => console.log("response"))
      .catch(err => console.error(err));

    await fetch(
      "https://genius-song-lyrics1.p.rapidapi.com/song/lyrics/?id=2396871",
      options
    )
      .then(res => res.json())
      .then(res => setLyrics(res.lyrics.lyrics.body.html))
      .catch(err => console.error(err));
  };
 */
  useEffect(() => {
    window.scrollTo(0, 0);
    if (singleTrack) {
      getArtistInfo();
      getPopularTrack();
      fetchColor();
    }
    //   getLyrics();
  }, []);

  // handle selected track to be active and lost focus by click outside of playlist
  const ref = useRef(null);
  useEffect(() => {
    const handleOutsideClick = e => {
      if (!ref?.current?.contains(e.target)) {
        setIsActive(-1);
      }
    };
    const timeoutId = setTimeout(() => {
      document.addEventListener("click", handleOutsideClick, false);
    }, 0);
    return () => {
      clearTimeout(timeoutId);
      document.removeEventListener("click", handleOutsideClick, false);
    };
  }, [isActive]);

  return (
    <div className={classes.main}>
      {singleTrack && colors && artistInfo && (
        <div>
          <Bouncer dependencies={[singleTrack]} />
          <div className={classes.headerNav}>The SINGLE page</div>
          <div
            className={classes.header}
            style={{
              backgroundImage: `linear-gradient(to bottom left, ${colors[3]},  ${colors[4]})`,
            }}
          >
            <img
              className={classes["album_cover"]}
              src={singleTrack?.track?.album.images[1].url}
              alt="track_image"
            />
            <div>
              <h4>SONG</h4>
              <h2>{singleTrack?.track.album.name}</h2>
              <div className={classes.headerInfo}>
                <div>
                  <img
                    src={artistInfo.images[1].url}
                    alt="artist_image"
                    className={classes["artist_image"]}
                  />
                  <NavLink className={classes.profileLink} to="/profile">
                    {artistName}
                  </NavLink>
                  <span></span>
                  <p>{singleTrack?.added_at.substring(0, 4)} </p>
                  <span></span>
                  <p>{msToTime(singleTrack.track.duration_ms)[1]}</p>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className={classes["single_lyrics"]}>
              {/*  <p>{parse(lyrics)} </p> */}
              <button>Log in</button>
              <button>Sign up</button>
            </div>
          </div>
          <div className={classes["artist_info"]}>
            <img
              src={artistInfo.images[1].url}
              alt="artist_image"
              className={classes["artist_profile_image"]}
            />
            <div>
              <h5 style={{ padding: "0.5rem 0" }}>ARTIST</h5>
              <h4> {artistName}</h4>
            </div>
          </div>
          <div>
            <div className={classes["popular_track"]}>
              <p>Popular Tracks by</p>
              <h3>{artistName}</h3>
            </div>
            <div className={classes.mainContainer}>
              {popularTrack &&
                trackArr.map((track, index) => {
                  return (
                    <div
                      key={index}
                      onClick={e => {
                        e.stopPropagation();
                        setIsActive(index);
                      }}
                      className={`${isActive === index ? classes.active : ""} ${
                        classes["playlist-container"]
                      } `}
                    >
                      <div className={classes.playlistInfo} key={index}>
                        <div className={classes.trackImg}>
                          <div className={classes["track_index"]}>
                            {index + 1}
                          </div>
                          {
                            <img
                              src={track.album.images[2].url}
                              alt="popular_track_image"
                            />
                          }
                        </div>
                      </div>
                      <div className={classes["album-info"]}>
                        <div>{track.name}</div>
                      </div>
                      <div className={classes["album-date"]}>
                        {track.album.release_date}
                      </div>{" "}
                      <div className={classes["track-duration"]}>
                        {msToTime(track.duration_ms)[1]}
                      </div>
                    </div>
                  );
                })}
            </div>
            {popularTrack?.tracks.length > 5 && (
              <button
                onClick={() => setShowMore(!showMore)}
                className={classes["show_btn"]}
              >
                {showMore ? "SHOW LESS" : "SEE MORE"}
              </button>
            )}
          </div>
          <div>
            <h2>{artistName} Albums</h2>
            <PopularAlbums artistId={artistId} />
          </div>

          <div>
            <h2>{artistName} Related Artists</h2>
            <RelatedArtists artistId={artistId} />
          </div>
        </div>
      )}
    </div>
  );
}
