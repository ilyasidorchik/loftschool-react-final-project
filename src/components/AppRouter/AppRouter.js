import React from 'react';
import { BrowserRouter, Switch, Redirect, Route } from 'react-router-dom';

import PrivateRoute from '../PrivateRoute';
import Header from '../Header';
import Login from '../Login';
import Map from '../Map';

function AppRouter() {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route path='/login' component={Login} />
        <PrivateRoute path='/map' component={Map} />
        <Redirect to='/login' />
      </Switch>
    </BrowserRouter>
  );
}

export default AppRouter;