import React, { PureComponent } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { getIsAuthorized } from '../../modules/Auth';

class PrivateRoute extends PureComponent {
    render() {
        const { isAuthorized, component, ...rest } = this.props;

        return <Route {...rest} render={this.renderRoute} />;
    }

    renderRoute = (props) => {
        const { isAuthorized, component: Component } = this.props;

        return (isAuthorized || window.localStorage.getItem('isAuthorized'))
            ? <Component {...props} />
            : <Redirect to="/login" />;
    };
}

export default connect(state => ({
    isAuthorized: getIsAuthorized(state)
}))(PrivateRoute);