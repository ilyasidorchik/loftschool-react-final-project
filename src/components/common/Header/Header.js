import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { withRouter, NavLink } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import { getIsAuthorized, fetchLogoutRequest } from '../../../modules/Auth';

const styles = (theme) => ({
    root: {
      flexGrow: 1,
    },
    title: {
      flexGrow: 1,
    },
});

class Header extends PureComponent {
    handleClick = (e) => {
        const { fetchLogoutRequest } = this.props;

        e.preventDefault();
        fetchLogoutRequest();
    };

    render() {
        const { isAuthorized, classes } = this.props;
        
        return (
            <div className={'Header ' + classes.root} data-testid="Header">
                <AppBar position="static" color="inherit">
                    <Toolbar>
                        <Typography variant="h6" className={classes.title}>
                            Loft Taxi
                        </Typography>
                        
                        <NavLink to="/map" data-testid="MapLink" component={Map}>
                            <Button color="default">
                                Карта
                            </Button>
                        </NavLink>

                        <NavLink to="/profile" data-testid="ProfileLink" component={Map}>
                            <Button color="default">Профиль</Button>
                        </NavLink>
                        
                        {isAuthorized || window.localStorage.getItem('isAuthorized')
                            ? (<NavLink to="/logout" onClick={this.handleClick} data-testid="LogoutLink">
                                <Button color="default">Выйти</Button>
                            </NavLink>)
                            : (<NavLink to="/login" component={Map} data-testid="LoginLink">
                                <Button color="default">Войти</Button>
                            </NavLink>)
                        }
                    </Toolbar>
                </AppBar>
            </div>
        )
    }
}

export const HeaderStyled = withStyles(styles)(Header);

const mapStateToProps = (state) => ({
    isAuthorized: getIsAuthorized(state)
});

const mapDispatchToProps = { fetchLogoutRequest };

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(HeaderStyled));