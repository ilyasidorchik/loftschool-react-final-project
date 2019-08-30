import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
    },
    title: {
      flexGrow: 1,
    },
  }));

export default function Header() {
    const classes = useStyles();

    return (
        <div className={'Header ' + classes.root}>
            <AppBar position="static" color="light">
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        Loft Taxi
                    </Typography>
                    <Button color="inherit">Карта</Button>
                    <Button color="inherit">Профиль</Button>
                    <Button color="inherit">Войти</Button>
                </Toolbar>
            </AppBar>
        </div>
    )
}