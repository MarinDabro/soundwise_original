import React from 'react';

const SearchResults = ({activeCat}) => {
  const {albums, artists, audiobooks, episodes, playlists, shows, tracks} = activeCat
  const categories = [albums, artists, audiobooks, episodes, playlists, shows, tracks]

  console.log(albums)
  return (
    <div>
      {categories.map((cat, index) => {
        console.log(cat)
        if (cat) {
          return (
            <div style={{color: 'white'}} key={index}>
              hi
            </div>
          )
        }
      })}
    </div>
  )
}

export default SearchResults

