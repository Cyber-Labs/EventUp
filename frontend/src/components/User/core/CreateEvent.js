import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import { isAuth, getCookie} from '../../shared/helpers';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

const CreateEvent = () => {
  
    const [values, setValues] = useState({
        name: '',
        about:'', 
        date:'',
        isPaid: 'free',
        price: 0,
        isPublic: 'public',
        buttonText: 'Create'
    });

    const { 
        name, 
        about, 
        date,
        isPaid,
        price,
        isPublic,
        buttonText
    } = values;

    const token = getCookie('token');

    const handleChange = name => event => {
        setValues({ ...values, [name]: event.target.value });
    };

    
    const clickSubmit = event => {
        event.preventDefault();
        setValues({ ...values, buttonText: 'Creating' });
        axios({
            method: 'POST',
            url: `${process.env.REACT_APP_API}/users/events`,
            headers: {
                Authorization: `Bearer ${token}`
            },
            data: {
                name: name, 
                about: about, 
                date: date,
                isPaid: isPaid,
                price: price,
                isPublic: isPublic,
                creator: isAuth()._id,
            }
        })
            .then(response => {
                console.log('Successfully created the event ', response);
                setValues({ 
                    ...values, 
                    name: '',
                    about:'', 
                    date:'',
                    isPaid: 'free',
                    price: 0,
                    isPublic: 'public',
                    creator: isAuth()._id ,
                    buttonText: 'Created'
                });
                toast.success("Successfully created the event");
            })
            .catch(error => {
                console.log('Error in creating new event ', error);
                setValues({ ...values, buttonText: 'Create' });
                toast.error(error.response.data.error);
            });
    };

    const CreateEventForm = () => (
        <form id="CreateEventForm"> 
            <div className="form-group">
                <label className="labelCenter">Event Name</label>
                <input 
                    onChange={handleChange('name')} 
                    value={name} 
                    name="name"
                    placeholder="Enter Event Name" 
                    type="text" 
                    className="form-control mx-auto" 
                />
            </div>

            <div className="form-group">
                <label className="labelCenter">About Event</label>
                <textarea  
                    onChange={handleChange('about')} 
                    value={about} 
                    name="about"
                    placeholder="Enter Event Details" 
                    type="text" 
                    className="form-control mx-auto" 
                    rows="5"
                />
            </div>

            <div className="form-group">
                <label className="labelCenter">Event Date</label>
                <input 
                    onChange={handleChange('date')} 
                    value={date} 
                    name="date"
                    type="date" 
                    className="form-control mx-auto" 
                />
            </div>

            <div className="form-group">
                <p className="labelCenter">Is the event paid/ free ? </p>
                <div className="labelCenter">
                    <input
                        type="radio"
                        id="paid"
                        value='paid'
                        checked={isPaid === 'paid'}
                        onChange={handleChange('isPaid')}    
                    />
                    <label htmlFor="paid"> Paid</label>&emsp;

                    <input
                        type="radio"
                        id="free"
                        value='free'
                        checked={isPaid === 'free'}
                        onChange={handleChange('isPaid')} 
                    />
                    <label htmlFor="free"> Free</label>&emsp;                    
                </div>            
            </div>

            <div className="form-group">
                <p className="labelCenter">Is the event public/ private ? </p>
                <div className="labelCenter">
                    <input
                        type="radio"
                        id="public"
                        value='public'
                        checked={isPublic === 'public'}
                        onChange={handleChange('isPublic')}    
                    />
                    <label htmlFor="public"> Public</label>&emsp;

                    <input
                        type="radio"
                        id="private"
                        value='private'
                        checked={isPublic === 'private'}
                        onChange={handleChange('isPublic')} 
                    />
                    <label htmlFor="private"> Private</label>&emsp;                    
                </div>            
            </div>

            <div className="form-group">
                <label className="labelCenter">Event Price</label>
                <input 
                    onChange={handleChange('price')} 
                    value={price}
                    placeholder="Enter Event Price"  
                    name="price"
                    type="number" 
                    className="form-control mx-auto" 
                />
            </div>

            <div className="text-center">
                <button className="btn btn-primary FormSubmit" onClick={clickSubmit} >
                    {buttonText}
                </button>
            </div>
        </form>
    );

    return (
        <React.Fragment>
            <div className="row">
                <ToastContainer />
                <div className="col-md-9 mx-auto my-4 ">
                    <div className="card card-body">
                        <h3 className="text-center mb-3">
                        Create New Event
                        </h3>                        
                        {CreateEventForm()}
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default CreateEvent;