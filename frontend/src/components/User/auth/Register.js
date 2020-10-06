import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import { isAuth } from '../../shared/helpers';
import { ToastContainer, toast } from 'react-toastify';
import bgPattern from '../../shared/images/bg2.jpg';
import 'react-toastify/dist/ReactToastify.min.css';

const Signup = () => {
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        buttonText: 'Submit'
    });

    const { name, email, password, buttonText } = values;

    const handleChange = name => event => {
        // console.log(event.target.value);
        setValues({ ...values, [name]: event.target.value });
    };

    const clickSubmit = event => {
        event.preventDefault();
        setValues({ ...values, buttonText: 'Submitting' });
        axios({
            method: 'POST',
            url: `${process.env.REACT_APP_API}/users/register`,
            data: { name, email, password }
        })
            .then(response => {
                console.log('Successfully registered ', response);
                setValues({ ...values, name: '', email: '', password: '', buttonText: 'Submitted' });
                toast.success(response.data.message);
            })
            .catch(error => {
                console.log('Error in registering the user ', error);
                setValues({ ...values, buttonText: 'Submit' });
                toast.error(error.response.data.error);
            });
    };

    const signupForm = () => (
        <form>
            <div className="form-group">
                <label className="labelCenter">Name</label>
                <input onChange={handleChange('name')} value={name} type="text" className="form-control mx-auto" />
            </div>

            <div className="form-group">
                <label className="labelCenter">Email</label>
                <input onChange={handleChange('email')} value={email} type="email" className="form-control mx-auto" />
            </div>

            <div className="form-group">
                <label className="labelCenter">Password</label>
                <input onChange={handleChange('password')} value={password} type="password" className="form-control mx-auto" />
            </div>

            <div>
                <button className="btn btn-primary FormSubmit" onClick={clickSubmit}>
                    {buttonText}
                </button>
            </div>
            <div className="container text-center mb-4">
                <hr/>
                Already have an account <Link to = "/users/login"> Login Now!</Link>
            </div>
        </form>
    );

    return (
        <div className="row login-background">
            <ToastContainer />
            <div className="col-md-6 mx-auto mt-5 mb-5">
                <div className="card card-body" id="signupForm">
                    {isAuth() && isAuth().role === 'user' ? <Redirect to="/users/dashboard" /> : null}
                    <h1 className="text-center mb-4">Register</h1>
                    {signupForm()}
                </div>                        
            </div>
        </div>  
    );
};

export default Signup;