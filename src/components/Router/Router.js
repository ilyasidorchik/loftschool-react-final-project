import React from 'react';
import { BrowserRouter, Switch, Redirect, Route } from 'react-router-dom';

import Login from '../Login';

function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/login' component={Login} />
        <Redirect to='/login' />
      </Switch>
    </BrowserRouter>
  );
}

export default Router;