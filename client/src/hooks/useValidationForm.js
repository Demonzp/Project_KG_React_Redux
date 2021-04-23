import { useState, useEffect } from 'react';

// Cоздаём кастомный хук UseValidationForm.
const UseValidationForm = (callback, initialState = {}, Validation, errorCallback = () => { }) => {
    const [values, setValues] = useState(initialState);
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Создаём функцию изменения.
    const handleChange = (event) => {
        const { name, value } = event.target;

        setValues({
            ...values,
            [name]: value
        });
    };

    // Создаём функцию отправки.
    const handleSubmit = (event) => {
        if (event) {
            event.preventDefault();
        }
        // Обработчик ошибок.
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