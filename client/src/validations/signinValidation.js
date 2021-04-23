import { emailRuls, passRuls } from './global';

export default function signinValidation(values) {
    return {
        ...emailRuls(values),
        ...passRuls(values)
    }
}