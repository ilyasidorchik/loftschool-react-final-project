import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { Formik, Field, Form } from 'formik';
import MuiTextField from '@material-ui/core/TextField';
import { fieldToTextField } from 'formik-material-ui';
import * as Yup from "yup";
import Grid from "@material-ui/core/Grid";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from "@material-ui/core/Button";
import Typography from '@material-ui/core/Typography';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker
} from '@material-ui/pickers';

import {
    getCardName,
    getCardNumber,
    getExpDate,
    getCVV,
    fetchProfileRequest
} from '../../modules/Profile';

const styles = theme => ({
    Grid: {
        minHeight: '100vh',
    },
    Title: {
      textAlign: 'center',
    },
    Card: {
        boxSizing: 'border-box',
        maxWidth: '60%',
        padding: 10
    },
    Grid__Card: {
        marginTop: 50
    },
    Card__P: {
        marginBottom: 20
    },
    Form__Input_Date: {
        marginTop: 0
    },
    Form__Button: {
        marginTop: theme.spacing(2),
    }
});

const BasicFormSchema = Yup.object().shape({
    cardName: Yup.string()
        .required("Необходимо заполнить поле")
        .matches(/^[A-Za-z]+\s+[A-Za-z]+$/, "Имя владельца должен быть полным и на латинице"),
    cardNumber: Yup.string()
        .required("Необходимо заполнить поле")
        .matches(/^[0-9]+$/, "Номер карты должен содержать только цифры")
        .length(16, "Номер карты должен содержать 16 цифр"),
    CVV: Yup.string()
        .required("Необходимо заполнить поле")
        .matches(/^[0-9]+$/, "СVV должен содержать только цифры")
        .length(3, "СVV должен содержать 3 цифры")
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

class Profile extends Component {
    state = {
        date: new Date('2025-01-01'),
        dateInputDisabled: false
    };

    componentDidMount() {
        const { fetchProfileRequest, classes } = this.props;
        const savedProfile = JSON.parse(window.localStorage.getItem('profile'));

        if (savedProfile) fetchProfileRequest(savedProfile);
    }

    handleDateChange = (date) => {
        this.setState({
            date
        });
    };

    getFormattedDate = (date) => {
        let day = date.getDate();
        if (day < 10) day = `0${day}`;

        let month = date.getMonth() + 1;
        if (month < 10) month = `0${month}`;

        let year = date.getFullYear();

        return `${day}.${month}.${year}`;
    }

    render() {
        const { fetchProfileRequest, classes } = this.props;

        const savedProfile = JSON.parse(window.localStorage.getItem('profile'));
        const { cardName, cardNumber, expDate, CVV } = (savedProfile) ? savedProfile : this.props;

        const { date, dateInputDisabled } = this.state;       

        return (
            <div className="Profile">
                <Grid
                    container
                    direction="column"
                    alignItems="center"
                    className={classes.Grid}
                >
                    <Card className={`${classes.Card} ${classes.Grid__Card}`}>
                        <CardContent>
                            <Typography gutterBottom variant="h4" component="h2" className={classes.Title}>
                                Профиль
                            </Typography>

                            <Typography gutterBottom variant="h6" component="h6">
                                Способ оплаты
                            </Typography>
                            <Formik
                                initialValues={{
                                    cardName: cardName,
                                    cardNumber: cardNumber,
                                    expDate: expDate,
                                    CVV: CVV
                                }}

                                validationSchema={BasicFormSchema}
                                
                                onSubmit={({ cardName, cardNumber, CVV }) => {
                                    this.setState({
                                        dateInputDisabled: true
                                    })

                                    const expDate = this.getFormattedDate(date);                                    
                                    fetchProfileRequest({ cardName, cardNumber, expDate, CVV });
                                }}

                                render={({ submitForm }) => (
                                    <Form
                                        className="Form"
                                    >
                                        <Grid
                                            container
                                            spacing={3}
                                        >
                                            <Grid item xs={12} sm={6}>
                                                <Field
                                                    type="text"
                                                    name="cardName"
                                                    label="Имя владельца"
                                                    fullWidth={true}
                                                    component={UppercasingTextField}
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <Field
                                                    type="text"
                                                    name="cardNumber"
                                                    label="Номер карты"
                                                    fullWidth={true}
                                                    component={UppercasingTextField}
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                                    <KeyboardDatePicker
                                                        className={classes.Form__Input_Date}
                                                        name="expDate"
                                                        label="Дата окончания действия"
                                                        id="date-picker-inline"
                                                        disableToolbar
                                                        variant="inline"
                                                        format="MM.dd.yyyy"
                                                        margin="normal"
                                                        fullWidth={true}
                                                        value={date}
                                                        onChange={this.handleDateChange}
                                                        disabled={dateInputDisabled}
                                                    />
                                                </MuiPickersUtilsProvider>
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <Field
                                                    type="text"
                                                    name="CVV"
                                                    label="CVV"
                                                    helperText="Три цифры на задней стороне карты"
                                                    fullWidth={true}
                                                    component={UppercasingTextField}
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <Button
                                                    className={classes.Form__Button}
                                                    type="submit"
                                                    variant="contained"
                                                    color="primary"
                                                    onClick={submitForm}
                                                >
                                                    Сохранить
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    </Form>
                                )}
                            />
                        </CardContent>
                    </Card>
                </Grid>
            </div>
        );
    }
};

const mapStateToProps = (state) => ({
    cardName: getCardName(state),
    cardNumber: getCardNumber(state),
    expDate: getExpDate(state),
    CVV: getCVV(state)
});

const mapDispatchToProps = { fetchProfileRequest };

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(Profile));