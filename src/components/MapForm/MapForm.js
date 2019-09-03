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

import { getCardName } from '../../modules/Profile';
import { getAddressList, fetchAddressListRequest } from '../../modules/Map';

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
                            
                <Link to='/profile'>
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

    renderOrderForm() {
        const { addressList, classes } = this.props;
    
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
                                
                    onSubmit={(values) => {
                        console.log(values)
                    }}

                    render={({ submitForm }) => (
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
                                    select
                                    margin="normal"
                                    component={UppercasingTextField}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
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
                                    select
                                    margin="normal"
                                    component={UppercasingTextField}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                >
                                    {ranges.map(option => (
                                        <MenuItem key={option} value={option}>
                                            {option}
                                        </MenuItem>
                                    ))}
                                </Field>
                                
                                <Button
                                    type="submit"
                                    onClick={submitForm}
                                    variant="outlined"
                                    color="primary"
                                    className={`${classes.Button} ${classes.Card__Button}`}
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
        const { cardName, classes } = this.props;
        const profileSaved = JSON.parse(window.localStorage.getItem('profile'));

        return (
            <div className={classes.MapForm}>
                <Card className={classes.Card}>
                    <CardContent>
                        {(cardName || profileSaved)
                            ? this.renderOrderForm()
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
    addressList: getAddressList(state)
});

const mapDispatchToProps = { fetchAddressListRequest };

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(MapForm));