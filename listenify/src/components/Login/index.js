import React from 'react';
import './index.scss';
import axios from 'axios';

const Login = () => {
    const clientId = 'e7c4f61b0cad4ef29625b7f21946d174';
    const redirectUri = "http://localhost:3000";
    const authEndpoint = "https://accounts.spotify.com/authorize"
    const responseType = "token"


    // ** ADD THE ACTUAL SCOPES **
    const scopes = ['user-read-private', 'user-read-email'];

    const authURL = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=${responseType}`
    // const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join('%20')}&response_type=token`;

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
        <div class='container'>
            <h1 id='login-title'>Welcome to Listenify</h1>
            <a id='authorization-link' href={authURL}>Authorize with Spotify</a>
        </div>
    )
}

export default Login