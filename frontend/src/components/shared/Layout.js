import React from 'react';
import { Route } from 'react-router-dom';
import Header from '../HeaderComponent';
import Footer from '../FooterComponent';

const Layout = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>
          <React.Fragment>
            <Header {...props} />
            <Component {...props} />
            <Footer {...props} />
          </React.Fragment>
        }
    ></Route>
);

export default Layout;