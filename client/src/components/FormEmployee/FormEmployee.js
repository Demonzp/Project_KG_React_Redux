import { Form, FormGroup, FormFeedback, Input, Label } from 'reactstrap';
import UseValidationForm from '../../hooks/useValidationForm';
import { employeeValidation } from '../../validations/employeeValidation';
import { employeeSex } from '../../constants/employeeSex';
import { useEffect } from 'react';

const FormEmployee = ({ employee, handleSubmit = () => { }, isSubmit }) => {

    const { handleSubmit: handleSubmitForm, values, handleChange, validErrors } = UseValidationForm(
        () => handleSubmit(values),
        employee,
        employeeValidation,
        () => handleSubmit()
    );

    useEffect(() => {
        if (isSubmit) {
            handleSubmitForm();
        }
    }, [isSubmit]);

    return (
        <Form>
            <FormGroup>
                <Label for='name'>Name:</Label>
                <Input
                    name='name'
                    invalid={validErrors.name && true}
                    value={values.name}
                    onChange={handleChange}
                    placeholder='John Smith'
                />
                {validErrors.name && <FormFeedback>{validErrors.name}</FormFeedback>}
            </FormGroup>
            <FormGroup>
                <Label for='sex'>Sex:</Label>
                <Input
                    type='select'
                    name='sex'
                    value={values.sex}
                    invalid={validErrors.sex && true}
                    onChange={handleChange}
                >
                    {
                        employeeSex.map((sex, index) => {
                            return <option key={index} >{sex}</option>
                        })
                    }
                </Input>
                {validErrors.sex && <FormFeedback>{validErrors.sex}</FormFeedback>}
            </FormGroup>
            <FormGroup>
                <Label for='birthday'>Birthday:</Label>
                <Input
                    type='date'
                    name='birthday'
                    value={values.birthday}
                    invalid={validErrors.birthday && true}
                    onChange={handleChange}
                />
                {validErrors.birthday && <FormFeedback>{validErrors.birthday}</FormFeedback>}
            </FormGroup>
            <FormGroup>
                <Label for='contacts'>Contacts:</Label>
                <Input
                    type='textarea'
                    name='contacts'
                    value={values.contacts}
                    onChange={handleChange}
                    invalid={validErrors.contacts && true}
                />
                {validErrors.contacts && <FormFeedback>{validErrors.contacts}</FormFeedback>}
            </FormGroup>
            <FormGroup>
                <Label for='position'>Position:</Label>
                <Input
                    name='position'
                    value={values.position}
                    onChange={handleChange}
                    invalid={validErrors.position && true}
                    placeholder='manager'
                />
                {validErrors.position && <FormFeedback>{validErrors.position}</FormFeedback>}
            </FormGroup>
            <FormGroup>
                <Label for='salary'>Salary:</Label>
                <Input
                    name='salary'
                    value={values.salary}
                    onChange={handleChange}
                    invalid={validErrors.salary && true}
                    placeholder='1000.00'
                />
                {validErrors.salary && <FormFeedback>{validErrors.salary}</FormFeedback>}
            </FormGroup>
        </Form>
    );
};

export default FormEmployee;