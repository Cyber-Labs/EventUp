import React, { Fragment } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Homepage from './components/Homepage';

const Routes = () => {
    return (
        <Fragment>
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={Homepage} />
                </Switch>
            </BrowserRouter>
        </Fragment>   
    );
};

export default Routes;