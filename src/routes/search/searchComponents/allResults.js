import React from 'react';

export default function allResults({ categories }) {
  return (
    <div>
      <div>
        <div>
        <h3>Top Results</h3>
        {categories.artists[0]}
        </div>
        
        <div><h3>Songs</h3></div>
        
      </div>
    </div>
  );
}
