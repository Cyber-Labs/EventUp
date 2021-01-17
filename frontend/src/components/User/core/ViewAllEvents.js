import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {Media, Button,Card} from 'react-bootstrap';
import {getCookie, isAuth } from '../../shared/helpers';
import { ToastContainer, toast } from 'react-toastify';
import Concert from '../../shared/images/concert.jpg';

export default function ViewAllEvents() {
    // const [currentPage, setcurrentPage] = useState('1');
    // const [pageArray, setpageArray] = useState([]);
    const [events, setevents] = useState([]);

    const token = getCookie('token');

    // const createPages =  (PageCount)  => {
    //     let temp = [];
    //     for(let i = 1; i <= PageCount; ++i)
    //     {
    //         temp.push(i);
    //     }
    //     setpageArray(temp);
    //     // console.log('pageArray');
    //     // console.log(pageArray);
    // }

    useEffect(() => {
        const loadevents = () => {
            axios({
                method: 'GET',
                url: `${process.env.REACT_APP_API}/events/all`,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then(response => {
                    // console.log('event postings found', response);
                    setevents(response.data);
                })
                .catch(error => {
                    console.log('Error in finding events ', error);
                });
        };
        // const loadPages = () => {
        //     axios({
        //         method: 'GET',
        //         url: `${process.env.REACT_APP_API}/events/pagecount`,
        //         headers: {
        //             Authorization: `Bearer ${token}`
        //         }
        //     })
        //         .then(response => {
        //             // console.log('Page count found', response);
        //             const pageCount = response.data;
        //             // console.log('pageCount in load pages');
        //             // console.log(pageCount);
        //             createPages(pageCount);
        //             // console.log('currentPage');
        //             // console.log(currentPage);
        //         })
        //         .catch(error => {
        //             console.log('Error in finding page count', error);
        //         });
        // };
        loadevents();
        // loadPages();
    },[]);

    const joinEvent = (eventId) => {
      axios({
        method: 'POST',
        url: `${process.env.REACT_APP_API}/events/join/${eventId}`,
        headers: {
            Authorization: `Bearer ${token}`
        },
        data: {
          userId: isAuth()._id
        }
      })
        .then(response => {
          toast.success('Successfully joined the event');
        })
        .catch(error => {
          console.log('Error in joining event ', error);
          toast.error('Error occured in joining the event');
        });
    }

    return(
        <React.Fragment>
            <h1 className='text-center'>Recent Events</h1>
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
                        <Button variant='primary' className='mt-3' onClick={() => joinEvent(event._id) }>Join</Button> &emsp;
                        <Button variant='success' className='mt-3' href={`/events/${event._id}`}>Discussion Page </Button>
                    </Card.Body>
                    </Card> 
                </div>
                
                                  
            ))}
            </div>            
            {/* <div className='mx-auto'>
                {   
                    pageArray.map(pageNumber => (
                    <div className='mx-auto' key={pageNumber}>                        
                        <button className='px-auto' onClick={() => {setcurrentPage(pageNumber)}}>{pageNumber}</button>
                    </div> 
                ))}         
            </div> */}
        </React.Fragment>
    );
}