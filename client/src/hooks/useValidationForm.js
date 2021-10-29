import { useState, useEffect } from 'react';

const UseValidationForm = (callback, initialState = {}, Validation, errorCallback = () => { }) => {
    const [values, setValues] = useState(initialState);
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setValues({
            ...values,
            [name]: value
        });
    };

    const handleSubmit = (event) => {
        if (event) {
            event.preventDefault();
        }
        setErrors(Validation(values));
        setIsSubmitting(true);
    };

    const handleReset = () => {
        setIsSubmitting(false);
        setErrors({});
        setValues(initialState);
    };

    useEffect(() => {
        if (isSubmitting) {
            if (Object.keys(errors).length === 0) {
                callback();
            } else {
                errorCallback(errors);
            }
            setIsSubmitting(false);
        }
    }, [errors, callback, isSubmitting]);

    return {
        handleChange,
        handleReset,
        handleSubmit,
        setValues,
        values,
        validErrors: errors,
        setErrors
    };
};

export default UseValidationForm;
