import React, { useEffect } from 'react';
import './index.scss'
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const Stats = () => {
  const location = useLocation();
  const token = location.state.AccessToken;
  useEffect(() => {
    
    if (token) {
      console.log("TOKEN FOUND:", token);
      const apiEndpoint = 'https://api.spotify.com/v1/me/player/recently-played';

      // Make the Axios GET request
      axios
        .get(apiEndpoint, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          // Handle the response data here
          const recentlyPlayedTracks = response.data.items;
          console.log(recentlyPlayedTracks);
        })
        .catch((error) => {
          // Handle any errors
          console.error('Error fetching recently played tracks:', error);
        });
    } else {
      console.log("TOKEN IS EMPTY");
    }
  })
    return (
        <h1>{token}</h1>
    )
}

export default Stats