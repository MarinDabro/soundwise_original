import React, { useEffect } from 'react';

export default function NewRelease(props) {
  const token = `${props.token}`; /* 'BQCnuE5OApwhvYtwOZFf66DopWjQdKF8CLZcBThAUOTLEmirl04OC6kH_iumBUfTzqVc5EEtzwCC8sRg_bzO3wqawQ5qz0os7vYUxmtRrYC7VOdUCKw' */

  useEffect(() => {
    async function getNewRelease() {
      await fetch('https://api.spotify.com/v1/browse/new-releases', {
        method: 'GET',
        accept: 'application/json',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
        .then(res => res.json())
        .then(res => console.log(res));
    }
    getNewRelease()
  }, [token]);

  return <div>NewRelease</div>;
}
