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
                SignOut
            </Button>
        </React.Fragment>    
    );
}