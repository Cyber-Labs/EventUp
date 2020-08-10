import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import { authenticate, isAuth } from '../../shared/helpers';
import { ToastContainer, toast } from 'react-toastify';
import {Button} from 'react-bootstrap';
import 'react-toastify/dist/ReactToastify.min.css';

const Signin = ({ history }) => {
    const [values, setValues] = useState({
        email: '',
        password: '',
        buttonText: 'Submit'
    });

    const { email, password, buttonText } = values;

    const handleChange = name => event => {
        // console.log(event.target.value);
        setValues({ ...values, [name]: event.target.value });
    };

    const clickSubmit = event => {
        event.preventDefault();
        setValues({ ...values, buttonText: 'Submitting' });
        axios({
            method: 'POST',
            url: `${process.env.REACT_APP_API}/users/login`,
            data: { email, password }
        })
            .then(response => {
                console.log('Sucessfully Logged in ', response);
                // save the response (user, token) localstorage/cookie
                authenticate(response, () => {
                    setValues({ ...values, name: '', email: '', password: '', buttonText: 'Submitted' });
                    toast.success(`Hey ${response.data.user.name}, Welcome back!`);
                    history.push('/users/dashboard');
                });
            })
            .catch(error => {
                console.log('SIGNIN ERROR', error.response.data);
                setValues({ ...values, buttonText: 'Submit' });
                toast.error(error.response.data.error);
            });
    };

    const signinForm = () => (
        <form>
            <div className="form-group">
                <label className="labelCenter">Email</label>
                <input onChange={handleChange('email')} value={email} type="email" className="form-control mx-auto border-right-0 border-left-0 border-top-0" />
            </div>

            <div className="form-group">
                <label className="labelCenter">Password</label>
                <input onChange={handleChange('password')} value={password} type="password" className="form-control mx-auto border-right-0 border-left-0 border-top-0" />
            </div>

            <div className="form-group">
                <Button className="btn btn-primary FormSubmit" onClick={clickSubmit}>
                    {buttonText}
                </Button>         
            </div>
        </form>
    );

    return (
        <div className="row m-0">
            <ToastContainer />
            <div className="col-md-6 mx-auto mt-5 mb-5">
                <div className="card card-body">
                    {isAuth() ? <Redirect to="/users/dashboard" /> : null}
                    <h1 className="text-center mb-4">Login</h1>
                    {signinForm()}
                    <br />
                </div>                        
            </div>
        </div>
    );
};

export default Signin;