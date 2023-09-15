import React from 'react';
import './index.scss';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';


const Login = () => {
    const clientId = 'e7c4f61b0cad4ef29625b7f21946d174';
    const redirectUri = "http://localhost:3000";
    const responseType = "token"
    const authEndpoint = "https://accounts.spotify.com/authorize"
    const navigate = useNavigate();

    // ** ADD THE ACTUAL SCOPES **
    // const scopes = ['ugc-image-upload', 'user-read-playback-state', 'user-modify-playback-state', 'user-read-currently-playing', 'app-remote-control', 'streaming', 
    // 'playlist-read-private', 'playlist-read-collaborative', 'playlist-modify-private', 'playlist-modify-public', 'user-follow-modify', 'user-follow-read', 
    // 'user-read-playback-position', 'user-top-read', 'user-read-recently-played', 'user-library-modify', 'user-library-read', 'user-read-email', 'user-read-private',
    // 'user-soa-link', 'user-soa-unlink', 'user-manage-entitlements', 'user-manage-partner', 'user-create-partner'];
    const scopes = 'user-read-recently-played';
    

    const authURL = `${authEndpoint}?scope=${scopes}&client_id=${clientId}&redirect_uri=${redirectUri}&response_type=${responseType}`
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

    useEffect(() => {
        //console.log("Derived: ", getTokenFromUrl())
        const token = getTokenFromUrl().access_token
        window.location.has = "";
        if (token) {
            window.localStorage.setItem("token", token);
            navigate("/activity", { state: { AccessToken: token } });
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