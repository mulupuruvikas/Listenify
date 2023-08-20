import React from 'react';
import './index.scss';
import axios from 'axios';
import SpotifyWebApi from 'spotify-web-api-js';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const clientId = 'e7c4f61b0cad4ef29625b7f21946d174';
    const redirectUri = "http://localhost:3000";
    const authEndpoint = "https://accounts.spotify.com/authorize"
    const responseType = "token"
    const spotify = new SpotifyWebApi();
    const [spotifyToken, setSpotifyToken] = useState("");
    const navigate = useNavigate();


    // ** ADD THE ACTUAL SCOPES **
    const scopes = ['user-read-private', 'user-read-email'];

    const authURL = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=${responseType}`
    // const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join('%20')}&response_type=token`;

    const getTokenFromUrl = () => { 
        return window.location.hash
            .substring(1)
            .split('&')
            .reduce((initial, item) => {
                let parts = item.split("=");
                initial[parts[0]] = decodeURIComponent(parts[1])

                return initial;
            }, {});
    }
    const apiUrl = 'https://accounts.spotify.com/api/token';

    useEffect(() => {
        console.log("Derived: ", getTokenFromUrl())
        const spotifytoken = getTokenFromUrl().access_token;
        window.location.has = "";

        console.log("SPOTIFY TOKEN: ", spotifytoken);

        if (spotifytoken) {

            setSpotifyToken(spotifytoken);

            spotify.setAccessToken(spotifytoken);
            spotify.getMe().then((user)=> {
                console.log("THIS IS YOU: ", user)
                navigate("/activity", { state: { person: user } });
            });
        }  
    })  

    return (
        <div className='container'>
            <h1 id='login-title'>Welcome to Listenify</h1>
            <a id='authorization-link' href={authURL}>Authorize with Spotify</a>
        </div>
    )
}

export default Login