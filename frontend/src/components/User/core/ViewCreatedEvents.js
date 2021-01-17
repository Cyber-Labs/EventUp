import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {Media, Button, Card} from 'react-bootstrap';
import {getCookie, isAuth } from '../../shared/helpers';
import { ToastContainer, toast } from 'react-toastify';
import Concert from '../../shared/images/concert.jpg';

export default function ViewCreatedEvents() {
    const [events, setevents] = useState([]);

    const token = getCookie('token');

    useEffect(() => {
      const loadevents = () => {
        axios({
          method: 'GET',
          url: `${process.env.REACT_APP_API}/users/created-events`,
          headers: {
              Authorization: `Bearer ${token}`
          }
        })
          .then(response => {
            console.log(response);
            setevents(response.data);
          })
          .catch(error => {
            console.log('Error in finding events ', error);
          });
      };
      loadevents();
    },[]);

    return(
        <React.Fragment>
            <h1 className='text-center'>Created Events</h1>
            <ToastContainer />
            <div className='mx-auto'>
            {
                events    &&
                events.map((event, index) => ( 
                <div className='m-5' key={index}>
                    <Card>
                    <Card.Header>{event.name}</Card.Header>
                    <Card.Body>
                        <Media>
                            <img
                            width={150}
                            height={150}
                            className='align-self-start mr-3'
                            src={event.secureUrl || Concert}
                            alt='Generic placeholder'
                            />
                            <Media.Body>
                                <Card.Title>Event Details</Card.Title>
                                <Card.Text>
                                    {event.about}
                                </Card.Text>
                            </Media.Body>
                        </Media>
                        <Button variant='success' className='mt-3' href={`/events/${event._id}`}>Discussion Page </Button>
                    </Card.Body>
                    </Card> 
                </div>
                
                                  
            ))}
            </div>
        </React.Fragment>
    );
}