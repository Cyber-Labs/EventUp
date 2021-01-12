import React, { Fragment, useRef } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./Styles.css";

import Homepage from "./components/Homepage/Homepage";
import AboutusPage from "./components/AboutusPage";
import Header from "./components/HeaderComponent";
import Footer from "./components/FooterComponent";
import Showqrcode from "./components/Showqrcode";
import Upload from "./components/Upload";

import UserLogin from "./components/User/auth/Login";
import UserRegister from "./components/User/auth/Register";
import UserPrivateRoute from "./components/User/auth/PrivateRoute";

import UserDashboard from "./components/User/core/Dashboard";
import UserCreateEvent from "./components/User/core/CreateEvent";
import ViewAllEvents from "./components/User/core/ViewAllEvents";
import DiscussionPage from "./components/User/core/DiscussionPage";
import { Provider } from "./state/state";

const Routes = () => {
  const store = useRef({});
  function getUser() {
    return JSON.parse(localStorage.getItem("user"));
  }

  return (
    <Provider value={{ store, getUser }}>
      <Fragment>
        <BrowserRouter>
          <Switch>
            <Route exact path="/">
              <Header key="1" />
              <Homepage />
            </Route>
            <Route exact path="/qrcode">
              <Header key="2" />
              <Showqrcode />
            </Route>
            <Route exact path="/aboutus">
              <Header key="3" />
              <AboutusPage />
            </Route>
            <Route exact path="/upload">
              <Header key="4" />
              <Upload />
            </Route>
            <Route exact path="/users/login">
              <Header key="5" />
              <UserLogin />
            </Route>
            <Route exact path="/users/register">
              <Header key="6" />
              <UserRegister />
            </Route>

            <UserPrivateRoute exact path="/users/dashboard">
              <Header key="7" />
              <UserDashboard />
            </UserPrivateRoute>
            <UserPrivateRoute exact path="/events/create">
              <Header key="8" />
              <UserCreateEvent />
            </UserPrivateRoute>
            <UserPrivateRoute exact path="/events">
              <Header key="9" />
              <ViewAllEvents />
            </UserPrivateRoute>
            <UserPrivateRoute exact path="/events/:eventid">
              <Header key="10" />
              <DiscussionPage />
            </UserPrivateRoute>
          </Switch>
          <Footer />
        </BrowserRouter>
      </Fragment>
    </Provider>
  );
};

export default Routes;
