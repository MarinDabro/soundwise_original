import React, { useContext, useEffect } from "react";
import { spotify } from "../../spotify";
import MainContext from "../../context/MainContext";
import PlayerContext from "../../context/PlayerContext";
import classes from "./UserPlayList.module.css";
import { NavLink, Outlet } from "react-router-dom";
import axios from "axios";

export default function UserPlayList() {
  const [{ hashToken }, DISPATCH] = useContext(MainContext);
  const [player, playerDispatch] = useContext(PlayerContext);
  const { selectedPlaylistId, selectedPlaylist } = player;

  useEffect(() => {
    const getInitialPlaylist = async () => {
      const response = await axios.get(
        `https://api.spotify.com/v1/playlists/${selectedPlaylistId}`,
        {
          headers: {
            Authorization: "Bearer " + hashToken,
            "Content-Type": "application/json",
          },
        }
      );
      const selectedPlaylist = {
        id: response.data.id,
        name: response.data.name,
        description: response.data.description.startsWith("<a")
          ? ""
          : response.data.description,
        image: response.data.images[0].url,
        tracks: response.data.tracks.items.map(({ track }) => ({
          id: track.id,
          name: track.name,
          artists: track.artists.map(artist => artist.name),
          image: track.album.images[2].url,
          duration: track.duration_ms,
          album: track.album.name,
          context_uri: track.album.uri,
          track_number: track.track_number,
        })),
      };
      playerDispatch({ type: "SET_PLAYLIST", selectedPlaylist });
    };
    getInitialPlaylist();
  }, [hashToken, playerDispatch, selectedPlaylistId]);
  const playTrack = async (
    id,
    name,
    artists,
    image,
    context_uri,
    track_number
  ) => {
    const response = await axios.put(
      `https://api.spotify.com/v1/me/player/play`,
      {
        context_uri,
        offset: {
          position: track_number - 1,
        },
        position_ms: 0,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + hashToken,
        },
      }
    );
    if (response.status === 204) {
      const currentPlaying = {
        id,
        name,
        artists,
        image,
      };
      playerDispatch({ type: "SET_PLAYING", currentPlaying });
      playerDispatch({ type: "SET_PLAYER_STATE", playerState: true });
    } else {
      playerDispatch({ type: "SET_PLAYER_STATE", playerState: true });
    }
  };
  const msToMinutesAndSeconds = ms => {
    var minutes = Math.floor(ms / 60000);
    var seconds = ((ms % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  };
  return (
    <div lassName={classes.main}>
      {selectedPlaylist && (
        <>
          <div>
            <div>
              <img src={selectedPlaylist.image} alt="selected playlist" />
            </div>
            <div>
              <span>PLAYLIST</span>
              <h1>{selectedPlaylist.name}</h1>
              <p>{selectedPlaylist.description}</p>
            </div>
          </div>
          <div>
            <div>
              <div className="col">
                <span>#</span>
              </div>
              <div className="col">
                <span>TITLE</span>
              </div>
              <div className="col">
                <span>ALBUM</span>
              </div>
              <div className="col">
                <span>Time</span>
              </div>
            </div>
            <div className="tracks">
              {selectedPlaylist.tracks.map(
                (
                  {
                    id,
                    name,
                    artists,
                    image,
                    duration,
                    album,
                    context_uri,
                    track_number,
                  },
                  index
                ) => {
                  return (
                    <div
                      className="row"
                      key={id}
                      onClick={() =>
                        playTrack(
                          id,
                          name,
                          artists,
                          image,
                          context_uri,
                          track_number
                        )
                      }
                    >
                      <div>
                        <span>{index + 1}</span>
                      </div>
                      <div>
                        <div>
                          <img src={image} alt="track" />
                        </div>
                        <div>
                          <span>{name}</span>
                          <span>{artists}</span>
                        </div>
                      </div>
                      <div>
                        <span>{album}</span>
                      </div>
                      <div>
                        <span>{msToMinutesAndSeconds(duration)}</span>
                      </div>
                    </div>
                  );
                }
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

/* const [STATE, DISPATCH] = useContext(MainContext);
const { user, hashToken } = STATE;

console.log("This is the playlists", STATE.playlist);

const playlists = STATE.playlist?.items;

console.log(playlists);
useEffect(() => {
  async function getData() {
    if (hashToken) {
      spotify.setAccessToken(hashToken);
      DISPATCH({
        type: "SET_TOKEN",
        token: hashToken,
      });

      let playListId = "";

      await spotify.getUserPlaylists().then(response => {
        console.log(response);
        console.log(response.items[0].id);
        playListId = response.items[0].id;

        DISPATCH({
          type: "SET_PLAYLIST",
          playlist: response,
        });
      });

      spotify.getPlaylistTracks(playListId).then(response => {
        console.log(playListId);
        console.log(response);
        DISPATCH({
          type: "SET_PLAYLIST_TRACKS",
          playlistTracks: response,
        });
      });
    }
  }
  getData();
}, []);

return (
  <div className={classes.main}>
    {playlists?.map((playlist, index) => {
      return (
        <NavLink
          to="/activePlaylist"
          state={{ playlist: playlist }}
          key={index}
        >
          {playlist.name}
        </NavLink>
      );
    })}
    <Outlet />
  </div>
);
 */
