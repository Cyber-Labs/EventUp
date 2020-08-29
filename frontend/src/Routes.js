import React, { Fragment } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Homepage from './components/Homepage';

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
                <Switch>
                    <Route exact path="/" component={Homepage} />

                    <Route exact path="/users/login" component={UserLogin} />
                    <Route exact path="/users/register" component={UserRegister} />

                    <UserPrivateRoute exact path="/users/dashboard" component={UserDashboard} />
                    <UserPrivateRoute exact path="/users/events/create" component={UserCreateEvent} />
                    <UserPrivateRoute exact path="/users/events" component={ViewAllEvents} />
                </Switch>
            </BrowserRouter>
        </Fragment>   
    );
};

export default Routes;