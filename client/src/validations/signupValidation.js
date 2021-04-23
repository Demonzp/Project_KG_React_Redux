import { emailRuls, passRuls } from './global';

const loginNumChars = 3;

export const signupValidation = (values) => {
    let errors = {
        ...emailRuls(values),
        ...passRuls(values)
    };

    if (!values.login) {
        errors.login = 'Login is required';
    } else if (values.login.length < loginNumChars) {
        errors.login = `Login needs to be equal or more than ${loginNumChars} characters`;
    }

    return errors;
}