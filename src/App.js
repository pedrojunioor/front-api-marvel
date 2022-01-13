import React from 'react'
import { Router } from 'react-router-dom';
import Routes from './routes';
import history from './history';
import { ComicsProvider } from './context/ComicsContext'
import TopHeader from './components/TopHeader/TopHeader'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'

function App() {

    return (
        <ComicsProvider>
            <Router history={history}>
                <TopHeader/>
                <Header/>
                <Routes />
                <Footer/>
            </Router>
        </ComicsProvider>

    );
}

export default App;
