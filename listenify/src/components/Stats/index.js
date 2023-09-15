import React, { useEffect, useState } from 'react';
import './index.scss'
import axios from 'axios';

const Stats = () => {
  const token = window.localStorage.getItem("token")
  const [searchKey, setSearchKey] = useState("")


  /*useEffect(() => {
    
    if (token) {
      console.log("TOKEN FOUND:", token);
      const apiEndpoint = 'https://api.spotify.com/v1/search';


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
  */

  const getRecentlyPlayed = async(e) => {
      // Make the Axios GET request
      e.preventDefault()
      axios.get("https://api.spotify.com/v1/me/player/recently-played", {
          headers: {
            Authorization: `Bearer ${token}`
          }
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
  }

  const searchArtists = async(e) => {
    e.preventDefault()
      const {data} = await axios.get("https://api.spotify.com/v1/search", {
        headers: {
          Authorization: `Bearer ${token}`
        },
        params: {
          q: searchKey,
          type: 'artist'
        }
        
      })
      console.log(data)

  }

  return (
    <div>
      {/* <form onSubmit={searchArtists}>
        <input type='text' onChange={e => setSearchKey(e.target.value)} />
        <button type={"submit"}>Search</button>
      </form> */}
      <button onClick={getRecentlyPlayed}>print recently played!</button>
    </div>
  )
}

export default Stats