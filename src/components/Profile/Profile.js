import React, { Component } from 'react';
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
    expDate: Yup.date()
        .required("Необходимо заполнить поле"),
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
    render() {
        const { classes } = this.props;

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
                                    cardName: "",
                                    cardNumber: "",
                                    expDate: "",
                                    CVV: ""
                                }}

                                validationSchema={BasicFormSchema}
                                
                                onSubmit={(values) => {
                                    console.log(values);
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
                                                <Field
                                                    type="date"
                                                    name="expDate"
                                                    label="Дата окончания действия"
                                                    fullWidth={true}
                                                    component={UppercasingTextField}
                                                />
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

export default withStyles(styles)(Profile);