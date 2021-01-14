import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isAuth } from '../../shared/helpers';
import Header from '../../HeaderComponent';
import Footer from '../../FooterComponent';

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            isAuth()  ? (
              <React.Fragment>
                <Header {...props} />
                <Component {...props} />
                <Footer {...props} />
              </React.Fragment>
              
            ) : (
                <Redirect
                    to={{
                        pathname: '/users/login',
                        state: { from: props.location }
                    }}
                />
            )
        }
    ></Route>
);

export default PrivateRoute;