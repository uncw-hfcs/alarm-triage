import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
// import icon from '../assets/icon.svg';
import './App.global.css';
import MainTask from './containers/MainTask';

const AppMount = () => {
    return (
        <div className="App">
            <MainTask test={false} />
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
