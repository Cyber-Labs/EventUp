import React, { useState, useEffect } from 'react';
import axios from 'axios';
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
        axios({
            method: 'POST',            
            url: `${process.env.REACT_APP_API}/events/${eventId}/comment`,
            headers: {
                Authorization: `Bearer ${token}`
            },
            data: {message}
        })
            .then(response => {
                console.log('response.data ', response.data);
                setValues({ ...values, message: '' });
            })
            .catch(error => {
                console.log('Error in finding chats', error);
            });
    };  

    const ConvertDate = str => {
        let d = new Date (str);
        return d.toLocaleString();
    }

    useEffect(() => {
        const loadChats = () => {
            axios({
                method: 'GET',            
                url: `${process.env.REACT_APP_API}/events/${eventId}/comment`,
            })
                .then(response => {
                    console.log('response.data.data ', response.data.data);
                    setchats(response.data.data);
                })
                .catch(error => {
                    console.log('Error in finding chats', error);
                });
        };
        loadChats();
    },[message, eventId]);

    return(
      <React.Fragment>
        <div className='row m-0'>
          <div className='col-md-9 mx-auto my-2'>
            <h1 className='text-center'>Discussion Page</h1>
            <section className='msger'>
              <header className='msger-header'>
                  <div className='msger-header-title'>
                  <i className='fa fa-comments' aria-hidden='true'></i> Discussions
                  </div>
              </header>
              <div className='chat-container'>
              {
                chats    &&
                chats.map((chat, index) => (
                  <main className='msger-chat' key={index}>
                    {((isAuth()._id) && (chat.author._id) && (chat.author._id.toString() === isAuth()._id.toString()) ) ?
                      (<div className='msg right-msg'>
                        <div className='msg-bubble'>
                          <div className='msg-info'>
                          <div className='msg-info-name'>{chat.author.name}</div>
                          </div>
                          <div className='msg-text'>
                            {chat.text}
                          </div>
                          <div className='msg-info-time'>
                            {ConvertDate(chat.createdAt)}
                          </div>
                        </div>
                      </div>)
                    : 
                      (<div className='msg left-msg'>
                        <div className='msg-bubble'>
                          <div className='msg-info'>
                          <div className='msg-info-name'>{chat.author.name}</div>
                          </div>
                          <div className='msg-text'>
                              {chat.text}
                          </div>
                          <div className='msg-info-time'>
                              {ConvertDate(chat.createdAt)}
                          </div>
                        </div>
                      </div>)
                    }
                  </main>                                                     
              ))}
              </div>
            </section>
            <div>
              <form className='msger-inputarea'>
                <input 
                  type='text' 
                  className='msger-input' 
                  placeholder='Enter your message...' 
                  onChange={handleChange('message')}
                  value={message}
                />
                <button type='submit' className='msger-send-btn' onClick={clickSubmit}>Send</button>
              </form>
            </div>                  
          </div>
        </div>
      </React.Fragment>
    );
}