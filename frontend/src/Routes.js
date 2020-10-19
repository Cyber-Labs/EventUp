import React, { Fragment } from 'react';
import {BrowserRouter, Switch, Route } from 'react-router-dom';
import './Styles.css';

import Homepage from './components/Homepage';
import AboutusPage from './components/AboutusPage';
import Header from './components/HeaderComponent';
import Footer from './components/FooterComponent';
import Showqrcode from './components/Showqrcode';
import Upload from './components/Upload';

import UserLogin from './components/User/auth/Login';
import UserRegister from './components/User/auth/Register';
import UserPrivateRoute from './components/User/auth/PrivateRoute';

import UserDashboard from './components/User/core/Dashboard';
import UserCreateEvent from './components/User/core/CreateEvent';
import ViewAllEvents from './components/User/core/ViewAllEvents';


const Routes = () => {
    return (
        <Fragment>
            <BrowserRouter>
                <Header />
                <Switch>
                    <Route exact path="/" component={Homepage} />
                    <Route exact path="/qrcode" component={Showqrcode} />
                    <Route exact path="/aboutus" component={AboutusPage} />
                    <Route exact path="/upload" component={Upload} />

                    <Route exact path="/users/login" component={UserLogin} />
                    <Route exact path="/users/register" component={UserRegister} />

                    <UserPrivateRoute exact path="/users/dashboard" component={UserDashboard} />
                    <UserPrivateRoute exact path="/users/events/create" component={UserCreateEvent} />
                    <UserPrivateRoute exact path="/users/events" component={ViewAllEvents} />
                </Switch>
                <Footer />
            </BrowserRouter>
        </Fragment>   
    );
};

export default Routes;