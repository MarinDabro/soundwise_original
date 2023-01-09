import React, { useState } from 'react';
import logo from '../../media/headphones-gradient.png';
import { NavLink, Outlet } from 'react-router-dom';
import { Resizable } from 're-resizable';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHouse,
  faMagnifyingGlass,
  faBookOpen,
  faPlus,
  faHeart,
} from '@fortawesome/free-solid-svg-icons';
/* import logo1 from '../media/soundwise2.png' */
import classes from '../../components/nav/Nav.module.css';

export default function Nav() {
  const [state, setState] = useState({ width: '15vw', height: '200' });
  return (
    <Resizable
      style={{ border: '1px solid black' }}
      minHeight="100vh"
      minWidth="13vw"
      maxWidth="25vw"
      size={{ width: state.width, height: state.height }}
      onResizeStop={(e, direction, ref, d) => {
        setState({
          width: state.width + d.width,
          height: state.height + d.height,
        });
      }}
    >
      <div className={classes.main}>
        <div className={classes.logo}>
          <img src={logo} width={'65px'} alt="logo" />
          <h2>Soundwise</h2>
        </div>

        <nav className={classes.navLinks}>
          <div>
            <FontAwesomeIcon className={classes.awesome} icon={faHouse} />
            <NavLink className={classes.active} to="/">
              Home
            </NavLink>
          </div>
          <div>
            <FontAwesomeIcon
              className={classes.awesome}
              icon={faMagnifyingGlass}
            />
            <NavLink className={classes.active} to="search">
              Search
            </NavLink>
          </div>
          <div>
            <FontAwesomeIcon className={classes.awesome} icon={faBookOpen} />
            <NavLink className={classes.active} to="library">
              Library
            </NavLink>
          </div>

          <div>
            <FontAwesomeIcon className={classes.awesome} icon={faPlus} />
            <NavLink className={classes.active} to="playlist">
              Create Playlist
            </NavLink>
          </div>
          <div>
            <FontAwesomeIcon className={classes.awesome} icon={faHeart} />
            <NavLink className={classes.active} to="songs">
              Liked Songs
            </NavLink>
          </div>
        </nav>
      </div>
      <Outlet />
    </Resizable>
  );
}
