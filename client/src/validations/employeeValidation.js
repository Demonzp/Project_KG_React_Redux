const numNameChars = 2;

export const employeeValidation = (values) => {
    const errors = {};

    if (!values.name) {
        errors.name = 'Name is required';
    } else if (values.name.length < numNameChars) {
        errors.name = 'Name is invalid';
    }

    if (!values.sex || values.sex.length < 1) {
        errors.sex = 'Sex is required';
    }

    if (!values.birthday || values.birthday.length < 1) {
        errors.birthday = 'Birthday is required';
    }

    if (!values.contacts || values.contacts.length < 1) {
        errors.contacts = 'Contacts is required';
    }

    if (!values.position || values.position.length < 1) {
        errors.position = 'Position is required';
    }

    if (!values.salary || values.salary.length < 1) {
        errors.salary = 'Salary is required';
    }

    return errors;
}