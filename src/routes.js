import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './pages/Home/Home'
import Cart from './pages/Cart/Cart'

export default function Routes() {
    return (
        <Switch>
            <Route exact path='/'  >
                <Home />
            </Route>
            <Route exact path='/Cart' >
                <Cart />
            </Route>
        </Switch>
    );
}