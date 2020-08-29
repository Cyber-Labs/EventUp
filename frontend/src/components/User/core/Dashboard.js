// react
import React, { Fragment } from 'react';
import { useHistory } from 'react-router-dom';
import {Button} from 'react-bootstrap';
import { signout } from '../../shared/helpers';

export default function Homepage() {
    const history = useHistory();
    return(
        <React.Fragment>
            <div>
                <h1> Welcome to Dashboard</h1>
            </div>
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
        </React.Fragment>    
    );
}