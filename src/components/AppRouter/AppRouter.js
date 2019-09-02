import React, { Component } from 'react';
import { BrowserRouter, Switch, Redirect, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import Header from '../Header';
import Login from '../Login';
import PrivateRoute from '../PrivateRoute';
import Map from '../Map';
import Profile from '../Profile';
import { getIsAuthorized, fetchAuthRequest } from '../../modules/Auth';

class AppRouter extends Component {
  componentDidMount() {
    const { isAuthorized, fetchAuthRequest } = this.props;
    const authDataSaved = window.localStorage.getItem('authData');

    // Если в локальном хранилище есть данные — они записываются в стор
    if (!isAuthorized && authDataSaved) {
      fetchAuthRequest(JSON.parse(authDataSaved));
    }
  }

  render() {
    const { isAuthorized } = this.props;
    const authDataSaved = window.localStorage.getItem('authData');

    // Неавторизованный пользователь переводится на /login,
    // авторизованный — на /map
    let indexPath, indexComponent;
    if (isAuthorized || authDataSaved) {
      indexPath = '/map';
      indexComponent = Map;
    }
    else {
      indexPath = '/login';
      indexComponent = Login;
    }

    return (
      <BrowserRouter>
        <Header />
        <Switch>
          <Route path={indexPath} component={indexComponent} />
          <PrivateRoute path='/map' component={Map} />
          <PrivateRoute path='/profile' component={Profile} />
          <Redirect to={indexPath} />
        </Switch>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthorized: getIsAuthorized(state)
})

const mapDispatchToProps = { fetchAuthRequest };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppRouter);