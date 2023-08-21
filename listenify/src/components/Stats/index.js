import React from 'react';
import './index.scss'
import getTokenFromUrl from '../Login/index'
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Stats = () => {
    const location = useLocation();
    const person = location.state.person;
    const access_token = location.state.token;
    console.log(location.state);
    const imageUrl = person.images[0].url;
    const [recentTracks, setRecentTracks] = useState([]);
    useEffect(() => {
        console.log(`Bearer ${access_token}`);
        axios.get(`https://api.spotify.com/v1/me/player/recently-played?limit=${10}`, {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        })
        .then(response => {
            console.log(response.data)
        })
        .catch(error => {
            console.error("Error fetching recent tracks: ", error);
        })
    })

    return (
        <div className="explore">
            <div className="profile-bar">
                <img className="pfp" src={imageUrl} alt="Not found" />
                <h2>{person.display_name}</h2>
            </div>
            <div className="recently-played">
                <h1>Recently played</h1>
            </div>
        </div>
        
    )
}

export default Stats