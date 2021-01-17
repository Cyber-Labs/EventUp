// react
import React from 'react';
import { useHistory } from 'react-router-dom';
import {Button} from 'react-bootstrap';
import { signout } from '../../shared/helpers';

export default function Homepage() {
    const history = useHistory();
    return(
        <div style={{'minHeight': '50vh' }} className='text-center mt-5'>
            <div>
                <h1> Welcome to Dashboard</h1>
            </div>
            <br/>
                &emsp;
            <Button variant='success' href='/events/create'>Create Event</Button>
            &emsp;
            <Button variant='info' href='/events'>View All Events</Button>
            &emsp;
            <Button variant='danger' href='/events/created-events'>View Created Events</Button>
            &emsp;
            <Button variant='warning' href='/events/registered-events'>View Registered Events</Button>
        </div>    
    );
}