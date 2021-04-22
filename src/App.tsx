import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.global.css';
import MainSession from './containers/MainSession';

const AppMount = () => {
    return (
        <div className="App">
            <MainSession />
        </div>
    );
};

export default function App() {
    return (
        <Router>
            <div>
                <Route path="/" component={AppMount} />
            </div>
        </Router>
    );
}
