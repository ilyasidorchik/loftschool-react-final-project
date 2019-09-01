import React from 'react';
import { BrowserRouter, Switch, Redirect, Route } from 'react-router-dom';

import Header from '../Header';
import Login from '../Login';
import PrivateRoute from '../PrivateRoute';
import Map from '../Map';
import Profile from '../Profile';

function AppRouter() {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route path='/login' component={Login} />
        <PrivateRoute path='/map' component={Map} />
        <PrivateRoute path='/profile' component={Profile} />
        <Redirect to='/login' />
      </Switch>
    </BrowserRouter>
  );
}

export default AppRouter;