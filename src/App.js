import React from 'react'
import { Router } from 'react-router-dom';
import Routes from './routes';
import history from './history';
import { ComicsProvider } from './context/ComicsContext'
// import './App.scss'

function App() {

    return (
        <ComicsProvider>
            <Router history={history}>
                <Routes />
            </Router>
        </ComicsProvider>

    );
}

export default App;
