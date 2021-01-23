import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import App from './App';
import EditJob from './EditJob';

export default function Routes() {
    return (
        <Router>
            <Switch>
                <Route
                    exact={true}
                    path='/'
                    component={App}
                />
                <Route
                    exact={true}
                    path='/editjob'
                    component={EditJob}
                />
            </Switch>
        </Router>
    );
}