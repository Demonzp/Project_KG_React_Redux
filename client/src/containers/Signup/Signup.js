import { Fragment } from 'react';
import { useHistory } from 'react-router';
import { Button, Card, CardBody, CardHeader, Form, FormGroup, FormFeedback, Input, Label } from 'reactstrap';
import RouteNames from '../../constants/routeNames';

import useAuth from '../../hooks/useAuth';
import UseValidationForm from '../../hooks/useValidationForm';
import { signupValidation } from '../../validations/signupValidation';

const Signup = () => {

    const { signup } = useAuth();

    const history = useHistory();

    const submitUserHandler = async () => {
        try {
            await signup(values);
            history.push(RouteNames.signin);
        } catch (err) {
            if(err.response){
                alert(err.response.data);
            }
            console.error(err);
        };
    };

    const { handleSubmit, values, handleChange, validErrors } = UseValidationForm(
        submitUserHandler,
        { login: '', email: '', password: '' },
        signupValidation
    );

    ////////////////// RENDER ///////////////////

    return (
        <Fragment>
            <br />
            <Card outline color='secondary'>
                <CardHeader>
                    <h1>Registration</h1>
                    Please fill the fields below:
                </CardHeader>
                <CardBody>
                    <Form>
                        <FormGroup>
                            <Label for='login'>Login:</Label>
                            <Input
                                name='login'
                                value={values.login}
                                invalid={validErrors.login && true}
                                onChange={handleChange}
                            />
                            {validErrors.login && <FormFeedback>{validErrors.login}</FormFeedback>}
                        </FormGroup>
                        <FormGroup>
                            <Label for='email'>E-mail:</Label>
                            <Input
                                type='email'
                                name='email'
                                value={values.email}
                                invalid={validErrors.email && true}
                                onChange={handleChange}
                                placeholder='example@gmail.com'
                            />
                            {validErrors.email && <FormFeedback>{validErrors.email}</FormFeedback>}
                        </FormGroup>
                        <FormGroup>
                            <Label for='password'>Password:</Label>
                            <Input
                                type='password'
                                name='password'
                                invalid={validErrors.password && true}
                                value={values.password}
                                onChange={handleChange}
                            />
                            {validErrors.password && <FormFeedback>{validErrors.password}</FormFeedback>}
                        </FormGroup>
                        <br />
                        <Button outline color='success' onClick={handleSubmit}>SUBMIT</Button>
                    </Form>
                </CardBody>
            </Card>
        </Fragment>
    );
};

export default Signup;
