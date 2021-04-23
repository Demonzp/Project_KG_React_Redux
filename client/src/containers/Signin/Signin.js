import React from 'react';
import { Button, Card, CardBody, CardHeader, Form, FormGroup, FormFeedback, Input, Label } from 'reactstrap';

import useAuth from '../../hooks/useAuth';

import UseValidationForm from '../../hooks/useValidationForm';
import signinValidation from '../../validations/signinValidation';

const Signin = () => {

    // Отримуємо функцію авторизації з контексту.
    const { signin } = useAuth();

    //Беремо дані з форми авторизації та спрямовуємо їх у функцію авторизації, яку раніше отримали з контексту.
    const submitUserHandler = async () => {
        try {
            await signin(values);
        } catch (err) {
            console.error(err);
        };
    };

    const { handleSubmit, values, handleChange, validErrors } = UseValidationForm(
        submitUserHandler,
        { email: '', password: '' },
        signinValidation
    );

    ////////////////// RENDER ///////////////////

    return (
        <React.Fragment>
            <br />
            <Card outline color='secondary'>
                <CardHeader>
                    <h1>Authorization</h1>
                    Please fill the fields below:
                </CardHeader>
                <CardBody>
                    <Form>
                        <FormGroup>
                            <Label for='email'>E-mail:</Label>
                            <Input
                                type='email'
                                name='email'
                                invalid={validErrors.email && true}
                                value={values.email}
                                onChange={handleChange}
                                placeholder='example@gmail.com'
                            />
                            {validErrors.email && <FormFeedback>{validErrors.email}</FormFeedback>}
                        </FormGroup>
                        <FormGroup>
                            <Label for='password'>Password:</Label>
                            <Input
                                invalid={validErrors.password && true}
                                type='password'
                                name='password'
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
        </React.Fragment>
    );
};

export default Signin;