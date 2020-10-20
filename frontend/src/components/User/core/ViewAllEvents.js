import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {Media, Button,Card} from 'react-bootstrap';
import {getCookie } from '../../shared/helpers';
import Concert from '../../shared/images/concert.jpg';

export default function ViewAllEvents() {
    const [currentPage, setcurrentPage] = useState('1');
    const [pageArray, setpageArray] = useState([]);
    const [events, setevents] = useState([]);

    const token = getCookie('token');

    const createPages =  (PageCount)  => {
        let temp = [];
        for(let i = 1; i <= PageCount; ++i)
        {
            temp.push(i);
        }
        setpageArray(temp);
        // console.log("pageArray");
        // console.log(pageArray);
    }

    useEffect(() => {
        const loadevents = () => {
            axios({
                method: 'GET',
                url: `${process.env.REACT_APP_API}/users/events/page/${currentPage}`,
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
        const loadPages = () => {
            axios({
                method: 'GET',
                url: `${process.env.REACT_APP_API}/users/events/pagecount`,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then(response => {
                    // console.log('Page count found', response);
                    const pageCount = response.data;
                    // console.log("pageCount in load pages");
                    // console.log(pageCount);
                    createPages(pageCount);
                    // console.log("currentPage");
                    // console.log(currentPage);
                })
                .catch(error => {
                    console.log('Error in finding page count', error);
                });
        };
        loadevents();
        loadPages();
    },[currentPage, token]);

    return(
        <React.Fragment>
            <h1 className="text-center">Recent Events</h1>

            <div className="mx-auto">
            {
                events    &&
                events.map((event, index) => ( 
                <div className="m-5" key={index}>
                    <Card>
                    <Card.Header>{event.name}</Card.Header>
                    <Card.Body>
                        <Media>
                            <img
                            width={150}
                            height={150}
                            className="align-self-start mr-3"
                            src={Concert}
                            alt="Generic placeholder"
                            />
                            <Media.Body>
                                <Card.Title>Event Details</Card.Title>
                                <Card.Text>
                                    {event.about}
                                </Card.Text>
                            </Media.Body>
                        </Media>
                        <Button variant="primary" className="mt-3">Join</Button>
                        <Link to={`/users/events/${event._id}`}>Discussion Page</Link>
                    </Card.Body>
                    </Card> 
                </div>
                
                                  
            ))}
            </div>            
            <div className="mx-auto">
                {   
                    pageArray.map(pageNumber => (
                    <div className="mx-auto" key={pageNumber}>                        
                        <button className="px-auto" onClick={() => {setcurrentPage(pageNumber)}}>{pageNumber}</button>
                    </div> 
                ))}         
            </div>
        </React.Fragment>
    );
}