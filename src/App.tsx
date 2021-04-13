import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
// import icon from '../assets/icon.svg';
import './App.global.css';
import MainTask from './containers/MainTask';
import MainSession from './containers/MainSession';
import Welcome from './containers/Welcome';

const AppMount = () => {
    return (
        <div className="App">
            <MainSession test />
        </div>
    );
};

export default function App() {
    return (
        <Router>
            <Switch>
                <Route path="/" component={AppMount} />
            </Switch>
        </Router>
    );
}
