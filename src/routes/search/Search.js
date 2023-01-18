import React, { useState, useEffect, useContext } from 'react';
import 'font-awesome/css/font-awesome.min.css';
import classes from './Search.module.css';
import MainContext from '../../context/MainContext';
import style from '../MusicBox.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

export default function Search() {
  const [STATE, DISPATCH] = useContext(MainContext);
  const { albums, token } = STATE;
  const [searchInput, setSearchInput] = useState('');
  const [browseAll, setBrowseAll] = useState({});
  /*  console.log(albums); */
  console.log(browseAll);
  // ===> Need the id to get the artist
  async function getSearch() {
    const searchParams = {
      method: 'GET',
      accept: 'application/json',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    const artistID = await fetch(
      `https://api.spotify.com/v1/search?q=${searchInput}&type=artist`,
      searchParams
    )
      .then(res => res.json())
      .then(res => {
        /*         console.log(res.artists.items[0].id);
         */ return res.artists?.items[0].id; // add "?" to avoid the error of no artist
      });

    const resAlbums = await fetch(
      `https://api.spotify.com/v1/artists/${artistID}/albums?include_groups=album&market=DE&limit=50`,
      searchParams
    )
      .then(res => res.json())
      .then(res =>
        DISPATCH({
          type: 'SET_ALBUMS',
          albums: res.items,
        })
      );

    /* ===> Get artist */
    /*  await fetch(`https://api.spotify.com/v1/artists/${artistID}`, searchParams)
      .then(res => res.json()
      .then(res => console.log(res))) */

    /* ===> Browse all api */
    const getBrowseAll = await fetch(
      `https://api.spotify.com/v1/browse/categories?limit=30`,
      searchParams
    )
      .then(res => res.json())
      .then(res => setBrowseAll(res));
  }

  //using useEffect to refresh new input value
  useEffect(() => {
    if (searchInput !== '') getSearch();
  }, [searchInput]);

  return (
    <div className={classes.main}>
      <div className={classes.searchBar}>
        <input
          placeholder="&#xF002; What do you want to listen to"
          type="input"
          onChange={e => setSearchInput(e.target.value)}
        />
      </div>
      <div className={style.albumContainer}>
        {searchInput ? <h3>Albums</h3> : ''}
        {albums.map((album, index) => {
          return (
            <div key={index} className={style.albumBox}>
              <div className={style.albumImage}>
                <img src={album.images[0].url} alt="playlist image" />
              </div>
              <div className={style.albumName}>{album.name}</div>
              <div className={style.artistName}>{album.artists[0].name}</div>
            </div>
          );
        })}
      </div>
      <div>
       {/* <img src={browseAll.categories.items[0].icons[0].url} alt='all'/> */}
      </div>
    </div>
  );
}
