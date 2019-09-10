import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from "@material-ui/core/Button";
import Typography from '@material-ui/core/Typography';
import { Formik, Field, Form } from 'formik';
import MuiTextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { fieldToTextField } from 'formik-material-ui';
import * as Yup from "yup";
import Grid from "@material-ui/core/Grid";

import { getAddressList, fetchAddressListRequest } from '../../../modules/Map';
import { getCardName } from '../../../modules/Profile';
import { getProfileInLocalStorage } from '../../../modules/Profile/api';
import { getRoute, fetchRouteRequest, fetchNewRouteRequest } from '../../../modules/Route';

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
    Link: {
        textDecoration: 'none'
    },
    Card__Button: {
        marginTop: 20
    },
    Button: {
        maxWidth: 160
    }
});

const BasicFormSchema = Yup.object().shape({
    address1: Yup.string()
      .required("Необходимо выбрать адрес"),
    address2: Yup.string()
      .required("Необходимо выбрать адрес")
});

const UppercasingTextField = (props) => (
    <MuiTextField
        {...fieldToTextField(props)}
        onChange={(event) => {
            const { value } = event.target;
            props.form.setFieldValue(
                props.field.name,
                value ? value : ''
            );
        }}
    />
);

class MapForm extends Component {
    renderMessage() {
        const { classes } = this.props;

        return (
            <>
                <Typography gutterBottom variant="h4" component="h2">
                    Заполните платежные данные
                </Typography>

                <Typography variant="body2">
                    Укажите информацию о банковской карте,<br/>чтобы сделать заказ.
                </Typography>
                            
                <Link to='/profile' className={classes.Link}>
                    <Button
                        className={classes.Card__Button}
                        variant="outlined"
                        color="primary"
                    >
                        Перейти в профиль
                    </Button>
                </Link>
            </>
        );
    }

    renderNewOrderForm() {
        const { fetchNewRouteRequest, classes } = this.props;

        return (
            <>
                <Typography gutterBottom variant="h4" component="h2">
                    Заказ размещен
                </Typography>

                <Typography variant="body2">
                    Такси уже едет к вам. Прибудет приблизительно<br/>через 10 минут.
                </Typography>
                            
                <Button
                    className={classes.Card__Button}
                    variant="outlined"
                    color="primary"
                    onClick={fetchNewRouteRequest}
                >
                    Сделать новый заказ…
                </Button>
            </>
        );
    }

    renderOrderForm() {
        const { addressList, fetchRouteRequest, classes } = this.props;
    
        const ranges = (Array.isArray(addressList)) ? addressList : [];

        return (
            <>
                <Typography gutterBottom variant="h4" component="h2">
                    Вызов такси
                </Typography>

                <Formik
                    initialValues={{
                        address1: "",
                        address2: ""
                    }}

                    validationSchema={BasicFormSchema}
                                
                    onSubmit={({ address1, address2 }) => {
                        fetchRouteRequest({ address1, address2 });
                    }}

                    render={({
                            values,
                            handleChange,
                            isValid,
                            submitForm
                        }) => (
                        <Form>
                            <Grid
                                container
                                direction="column"
                                justify="space-around"
                                align-items="start"
                                className={classes.FormGrid}
                            >
                                <Field
                                    type="text"
                                    name="address1"
                                    label="Адрес отправления"
                                    value={values.address1}
                                    select
                                    margin="normal"
                                    component={UppercasingTextField}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    onChange={handleChange}
                                >
                                    {ranges.map(option => (
                                        <MenuItem key={option} value={option}>
                                            {option}
                                        </MenuItem>
                                    ))}
                                </Field>

                                <Field
                                    type="text"
                                    name="address2"
                                    label="Адрес прибытия"
                                    value={values.address2}
                                    select
                                    margin="normal"
                                    component={UppercasingTextField}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                >
                                    {ranges.map(option => {
                                        if (option === values.address1) return null;
                                        return (<MenuItem key={option} value={option}>
                                            {option}
                                        </MenuItem>);
                                    })}
                                </Field>
                                
                                <Button
                                    className={`${classes.Button} ${classes.Card__Button}`}
                                    type="submit"
                                    variant="outlined"
                                    color="primary" 
                                    disabled={!isValid}
                                    onClick={submitForm}
                                >
                                    Вызвать такси
                                </Button>
                            </Grid>
                        </Form>          
                    )}
                />
            </>
        );
    }

    render() {
        const { cardName, route, classes } = this.props;

        return (
            <div className={classes.MapForm}>
                <Card className={classes.Card}>
                    <CardContent>
                        {(cardName || getProfileInLocalStorage())
                            ? (route) ? this.renderNewOrderForm() : this.renderOrderForm()
                            : this.renderMessage()
                        }
                    </CardContent>
                </Card>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    cardName: getCardName(state),
    addressList: getAddressList(state),
    route: getRoute(state)
});

const mapDispatchToProps = {
    fetchAddressListRequest,
    fetchRouteRequest,
    fetchNewRouteRequest
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(MapForm));