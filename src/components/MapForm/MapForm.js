import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from "@material-ui/core/Button";
import Typography from '@material-ui/core/Typography';

const styles = (theme) => ({
    MapForm: {
        position: 'absolute',
        top: 50,
        left: 20
    },
    Card: {
        boxSizing: 'border-box',
        width: 480,
        padding: 10
    },
    MapForm__P: {
        marginBottom: 20
    }
});

class MapForm extends Component {
    render() {
        const { classes } = this.props;

        return (
            <div className={classes.MapForm}>
                <Card className={classes.Card}>
                    <CardContent>
                            <Typography gutterBottom variant="h4" component="h2">
                                Заполните платежные данные
                            </Typography>

                            <Typography variant="body2" className={classes.MapForm__P}>
                                Укажите информацию о банковской карте,<br/>чтобы сделать заказ.
                            </Typography>
                           
                            <Link to='/profile'>
                                <Button
                                    variant="outlined"
                                    color="primary"
                                >
                                    Перейти в профиль
                                </Button>
                            </Link>
                    </CardContent>
                </Card>
            </div>
        );
    }
}

export default withStyles(styles)(MapForm);