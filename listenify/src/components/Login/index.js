import React from 'react';
import './index.scss';
import axios from 'axios';

const Login = () => {
    const clientId = '0b57a117aac44afc882869dd0aa94e8c';
    const redirectUri = "http:\/\/localhost:3000/explore";

    // ** ADD THE ACTUAL SCOPES **
    const scopes = ['user-read-private', 'user-read-email'];

    const authUrl = `https:\/\/accounts.spotify.com/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join('%20')}&response_type=token`;

    const token = window.location.hash
        .substring(1)
        .split('&')
        .reduce((initial, item) => {
            if (item) {
            const parts = item.split('=');
            initial[parts[0]] = decodeURIComponent(parts[1]);
            }
            return initial;
        }, {});

    const apiUrl = 'https://api.spotify.com/v1/';

    // Make a sample API request
    axios.get(`${apiUrl}`, {
        headers: {
            Authorization: `Bearer ${token.access_token}`,
        },
    })
    .then(response => {
        console.log(response.data);
    })
    .catch(error => {
        console.error('Error fetching user data:', error);
    });
    return (
        <div>
        <h1>Welcome to My App</h1>
        <p>Please authorize your Spotify account to access your music.</p>
        <a href={authUrl}>Authorize with Spotify</a>
        </div>
    )
}

export default Login