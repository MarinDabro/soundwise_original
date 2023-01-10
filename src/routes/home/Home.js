import React from 'react'
import classes from './Home.module.css'

export default function Home() {

  const  SPOTIFY_CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET; 
  const  SPOTIFY_CLIENT_ID = process.env.REACT_APP_CLIENT_ID; 
  fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    body: 'grant_type=client_credentials&client_id=' + SPOTIFY_CLIENT_ID.toString('base64') + '&client_secret=' + SPOTIFY_CLIENT_SECRET.toString('base64') ,
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
})
.then(r => r.json())
.then(r => {
    console.log(r.access_token)
})



  return (
    <div className={classes.main}>
      
    </div>
  )
}