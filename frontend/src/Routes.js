import React, { Fragment } from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import './Styles.css';

import Homepage from './components/Homepage/Homepage';
import AboutusPage from './components/AboutusPage';

import Showqrcode from './components/Showqrcode';
import Upload from './components/Upload';

import UserLogin from './components/User/auth/Login';
import UserRegister from './components/User/auth/Register';
import UserPrivateRoute from './components/User/auth/PrivateRoute';

import UserDashboard from './components/User/core/Dashboard';
import UserCreateEvent from './components/User/core/CreateEvent';
import ViewAllEvents from './components/User/core/ViewAllEvents';
import ViewCreatedEvents from './components/User/core/ViewCreatedEvents';
import ViewRegisteredEvents from './components/User/core/ViewRegisteredEvents';
import DiscussionPage from './components/User/core/DiscussionPage';
import Layout from './components/shared/Layout';

const Routes = () => {

  return ( 
      <Fragment>
        <BrowserRouter> 
          <Switch>          
            <Layout exact path='/' component={ Homepage } />

            <Layout exact path='/qrcode' component={ Showqrcode } />
            <Layout exact path='/aboutus' component={AboutusPage} />
            <Layout exact path='/upload' component={ Upload } />

            <Layout exact path='/users/login' component={ UserLogin } />
            <Layout exact path='/users/register' component={ UserRegister } />

            <UserPrivateRoute exact path='/users/dashboard' component={ UserDashboard } />
            <UserPrivateRoute exact path='/events/create' component={ UserCreateEvent } />
            <UserPrivateRoute exact path='/events' component={ ViewAllEvents } />
            <UserPrivateRoute exact path='/events/created-events' component={ ViewCreatedEvents } />
            <UserPrivateRoute exact path='/events/registered-events' component={ ViewRegisteredEvents } />
            <UserPrivateRoute exact path='/events/:eventid' component={ DiscussionPage} />
            
          </Switch> 
        </BrowserRouter>
      </Fragment> 
  );
};

export default Routes;
