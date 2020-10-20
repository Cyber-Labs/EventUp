import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import axios from 'axios';
import { toast} from 'react-toastify';
import Image from 'react-bootstrap/Image'
import { isAuth, getCookie } from '../../shared/helpers';

import './DiscussionPage.css'

export default function DiscussionPage() {
    const [chats, setchats] = useState([]);
    const [values, setValues] = useState({
        message: '',
    });

    const token = getCookie('token');

    // get the url of the page
    const url = window.location.href.replace(/\/$/, '');  
    // remove optional / from end of url and get event id from url
    const eventId = url.substr(url.lastIndexOf('/') + 1);

    const { message } = values;

    const handleChange = name => event => {
        setValues({ ...values, [name]: event.target.value });
    };

    const clickSubmit = event => {
        event.preventDefault();
    };  

    const ConvertDate = str => {
        let d = new Date (str);
        return d.toLocaleString();
    }

    const loadChats = () => {
        axios({
            method: 'GET',            
            url: `${process.env.REACT_APP_API}/users/events/${eventId}/comment`,
        })
            .then(response => {
                console.log("response.data.data ", response.data.data);
                setchats(response.data.data);
            })
            .catch(error => {
                console.log('Error in finding chats', error);
            });
    };
    useEffect(() => {
        loadChats();
    },[message]);

    return(
        <React.Fragment>
            <div className="row">
                <div className="col-md-9 mx-auto my-0">
                    <h1 className="text-center">Discussion Page</h1>
                    <section className="msger">
                        <header className="msger-header">
                            <div className="msger-header-title">
                            <i className="fa fa-comments" aria-hidden="true"></i> Discussions
                            </div>
                        </header>

                        {/* <div className="msg left-msg mt-2">
                            <div className="msg-img fa fa-user-secret fa-3x"></div>
                            <div className="msg-bubble">
                                <div className="msg-info">
                                <div className="msg-info-name">Admin</div>
                                </div>
                                <div className="msg-text">
                                    Hi, welcome to Eventup! &#128578;
                                </div>
                            </div>
                        </div> */}
                    {
                        chats    &&
                        chats.map((chat, index) => (
                            <main className="msger-chat" key={index}>
                                {   
                                ( (isAuth()._id) && (chat.author._id) && (chat.author._id.toString() === isAuth()._id.toString()) ) ?
                                    (<div className="msg right-msg">
                                        <div className="msg-bubble">
                                            <div className="msg-info">
                                            <div className="msg-info-name">{chat.author.name}</div>
                                            </div>

                                            <div className="msg-text">
                                                {chat.text}
                                            </div>
                                            <div className="msg-info-time">
                                                {ConvertDate(chat.createdAt)}
                                            </div>
                                        </div>
                                    </div>)
                                : 
                                    (<div className="msg left-msg">
                                        <div className="msg-bubble">
                                            <div className="msg-info">
                                            <div className="msg-info-name">{chat.author.name}</div>
                                            </div>
                                            <div className="msg-text">
                                                {chat.text}
                                            </div>
                                            <div className="msg-info-time">
                                                {ConvertDate(chat.createdAt)}
                                            </div>
                                        </div>
                                    </div>)
                                }
                            </main>
                                                     
                    ))}
                    </section>

                    <div>
                        <form className="msger-inputarea">
                            <input 
                                type="text" 
                                className="msger-input" 
                                placeholder="Enter your message..." 
                                onChange={handleChange('message')}
                                value={message}
                            />
                            <button type="submit" className="msger-send-btn" onClick={clickSubmit} >Send</button>
                        </form>
                    </div>                  

                </div>
            </div>
        </React.Fragment>
    );
}