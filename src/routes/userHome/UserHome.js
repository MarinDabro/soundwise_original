import React from 'react'
import classes from './UserHome.module.css'
import UserPlayList from '../user_playList/UserPlayList'
export default function UserHome() {
  return (
    <div className={classes.main}>
        <div>This is the user home</div>
         <UserPlayList />
    </div>
  )
}
