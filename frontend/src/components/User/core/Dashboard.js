// react
import React from 'react';
import { useHistory } from 'react-router-dom';
import {Button} from 'react-bootstrap';
import { signout } from '../../shared/helpers';

export default function Homepage() {
    const history = useHistory();
    return(
        <div style={{"minHeight": "50vh" }} className="text-center mt-5">
            <div>
                <h1> Welcome to Dashboard</h1>
            </div>
            <br/>
            <Button
                onClick={() => {
                    signout(() => {
                        history.push("/");
                    });
                }}            
            >
                Sign Out
            </Button>
                &emsp;
            <Button variant="success" href='/users/events/create'>Create Event</Button>
            &emsp;
            <Button variant="info" href='/users/events'>View All Event</Button>
        </div>    
    );
}