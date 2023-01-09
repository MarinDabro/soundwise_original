import React from 'react'
/* import { NavLink, Outlet } from 'react-router-dom'; */
import logo from '../../media/headphones-gradient.png'
import { loginUrl } from '../../spotify';
import classes from './Login.module.css'
function Login() {
  return (
    <div className={classes.main}>
        <img src= {logo} alt='soundwise logo'/>
        <a href={loginUrl}>LOGIN TO SPOTIFY</a>
        
        </div>
  )
}

export default Login