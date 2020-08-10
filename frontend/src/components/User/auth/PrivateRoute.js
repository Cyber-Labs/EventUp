import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isAuth } from '../../shared/helpers';

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            isAuth()  ? (
                <Component {...props} />
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