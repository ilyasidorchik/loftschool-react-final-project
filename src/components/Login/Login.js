import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
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

import { getIsAuthorized, fetchAuthRequest } from '../../modules/Auth';
import Map from '../Map';

const styles = theme => ({
    Grid: {
        minHeight: '100vh',
    },
    title: {
      textAlign: 'center',
    },
    Card: {
        boxSizing: 'border-box',
        minWidth: '25%',
        padding: 10
    },
    FormGrid: {
        minHeight: 200
    },
    button: {
        maxWidth: 83
    },
});

const BasicFormSchema = Yup.object().shape({
    username: Yup.string()
      .email("Неверная электронная почта")
      .required("Необходимо заполнить поле"),
    password: Yup.string()
      .required("Необходимо заполнить поле")
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

class Login extends PureComponent {
    render() {
        const { isAuthorized } = this.props;

        return isAuthorized ? this.renderApp() : this.renderLogin(this.props);
    }

    renderApp() {
        return <Map />;
    }
    
    renderLogin() {
        const { fetchAuthRequest, classes } = this.props;

        return (
            <div className="Login">
                <Grid
                    container
                    direction="column"
                    justify="center"
                    alignItems="center"
                    className={classes.Grid}
                >
                    <Card className={classes.Card}>
                        <CardContent>
                            <Typography gutterBottom variant="h4" component="h2" className={classes.title}>
                                Войти
                            </Typography>
                            <Formik
                                initialValues={{
                                    username: "",
                                    password: ""
                                }}

                                validationSchema={BasicFormSchema}
                                
                                onSubmit={({ username, password }) => {
                                    console.log(username, password);
                                    fetchAuthRequest({ username, password });
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
                                                type="email"
                                                name="username"
                                                label="Эл. почта"
                                                component={UppercasingTextField}
                                            />
                                            <Field
                                                type="password"
                                                name="password"
                                                label="Пароль"
                                                component={UppercasingTextField}
                                            />
                                            <Button
                                                type="submit"
                                                onClick={submitForm}
                                                variant="outlined"
                                                color="primary"
                                                className={classes.button}
                                            >
                                                Войти
                                            </Button>
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
}

const mapStateToProps = (state) => ({
    isAuthorized: getIsAuthorized(state)
});

const mapDispatchToProps = { fetchAuthRequest };

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(Login));