import React, { useEffect, useState } from 'react';
import './index.scss'
import axios from 'axios';

const Stats = () => {
  const token = window.localStorage.getItem("token")
  const [searchKey, setSearchKey] = useState("")
  const [recentlyPlayed, setRecentlyPlayed] = useState([])

  const getRecentlyPlayed = async () => {
    // Make the Axios GET request
    try {
      const response = await axios.get("https://api.spotify.com/v1/me/player/recently-played", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      // Handle the response data here
      const recentlyPlayedTracks = response.data.items;
      console.log(recentlyPlayedTracks);

      // Update the state with the recently played tracks
      setRecentlyPlayed(recentlyPlayedTracks);
    } catch (error) {
      // Handle any errors
      console.error('Error fetching recently played tracks:', error);
    }
  }

  const searchArtists = async (e) => {
    e.preventDefault();
    const { data } = await axios.get("https://api.spotify.com/v1/search", {
      headers: {
        Authorization: `Bearer ${token}`
      },
      params: {
        q: searchKey,
        type: 'artist'
      }
    });
    console.log(data);
    // Update the state with the search results
    setRecentlyPlayed(data);
  }

  useEffect(() => {
    // Call the getRecentlyPlayed function when the component mounts
    getRecentlyPlayed();
  }, []); // Pass an empty dependency array to run it only once on mount

  return (
    <div>
      <h1>Recently Played Tracks</h1>
      <table border="1">
        <thead>
        </thead>
        <tbody>
          {recentlyPlayed.map((item, index) => (
            <tr key={index}>
              <td>
                <img src={item.track.album.images[0].url} alt="Item" width="100" height="100" />
              </td>
              <td>{item.track.name}</td>
              <td>{item.track.artists[0].name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Stats;
