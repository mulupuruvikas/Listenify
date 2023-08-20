import React from 'react';
import './index.scss'
import { useLocation } from 'react-router-dom';

const Stats = () => {
    const location = useLocation();
    const person = location.state.person;
    const profile_pic = person.images[0];
    return (
        <h1>Name: {person.display_name}</h1>
        
    )
}

export default Stats