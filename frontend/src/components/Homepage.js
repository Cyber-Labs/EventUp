// react
import React from 'react';
import { Link } from 'react-router-dom';

export default function Homepage() { 
    return(
        <div style={{"minHeight": "50vh" }} className="mt-5">
            <h1 className="text-center"> Welcome to Homepage</h1>
            <Link to="/users/login">Login</Link>
            <br/>
            <Link to="/users/register">Register</Link>
            <br/>
            <Link to="/qrcode">View Dummy QR Code</Link>
            <br/>
            <Link to="/upload">Upload Image</Link>
        </div>
    );
}