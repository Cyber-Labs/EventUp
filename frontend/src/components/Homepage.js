// react
import React, { Fragment } from 'react';
import { Link, Redirect } from 'react-router-dom';

export default function Homepage() {
 
    return(
        <React.Fragment>
            <div>
                <h1> Welcome to Homepage</h1>
                <Link to="/users/login">Login</Link>
                <br/>
                <Link to="/users/register">Register</Link>
                <br/>
                <Link to="/qrcode">View Dummy QR Code</Link>
                <br/>
                <Link to="/upload">Upload Image</Link>
            </div>
        </React.Fragment>    
    );
}