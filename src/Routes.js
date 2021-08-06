import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import App from './App';
import EditJob from './EditJob';
import AddJob from './AddJob';
import Learn from './Learn';

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
                <Route
                    exact={true}
                    path='/addjob'
                    component={AddJob}
                />
                <Route
                    exact={true}
                    path='/learn'
                    component={Learn}
                />
            </Switch>
        </Router>
    );
}