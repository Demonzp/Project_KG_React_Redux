// import axios from 'axios'; // Потрібно розкоментувати для VARIANT 2.

import React, { useState, useEffect } from 'react';
import { Button, Table } from 'reactstrap';

import { employeeSex } from '../../constants/employeeSex';
import FormEmployee from '../../components/FormEmployee/FormEmployee';
import CustomModal from '../../components/CustomModal/CustomModal';
import { useDispatch, useSelector } from 'react-redux';
import { addEmployee, deleteEmployee, editEmployee, fetchEmployee } from '../../state/actions/employee';

const Employee = () => {

    const {employees} = useSelector(state=>state.employee);
    const dispatch = useDispatch();

    const [selectEmployee, setSelectEmployee] = useState();

    const [createEmployeeModal, setCreateEmployeeModal] = useState(false);
    const [editEmployeeModal, setEditEmployeeModal] = useState(false);

    useEffect(() => {
        getEmployees();
    }, []);

    const toggleCreateEmployeeModal = () => setCreateEmployeeModal(!createEmployeeModal);
    const toggleEditEmployeeModal = () => setEditEmployeeModal(!editEmployeeModal);

    ////////////////// HTTP REQUESTS ///////////////////

    // GET
    const getEmployees = () => {
       dispatch(fetchEmployee);
    };

    // POST
    const addEmployeeHandler = async (values) => {
        try {
            await dispatch(addEmployee(values));
            toggleCreateEmployeeModal();
        } catch (error) {
            console.error(error);
        }
        
    };

    // PUT
    const updateEmployeeHandler = async (vals) => {
        try {
            await dispatch(editEmployee(vals));
            toggleEditEmployeeModal();
        } catch (error) {
            console.error(error);
        }
        
    };

    const editEmployeeHandler = (_id) => {
        try {
            const employee = employees.find((el) => el._id === _id);
            setSelectEmployee(employee);
            toggleEditEmployeeModal();
        } catch (err) {
            console.error(err);
        };
    };

    // DELETE
    const deleteEmployeeHandler = async (_id) => {
        await dispatch(deleteEmployee(_id));
    };

    ////////////////// RENDER ///////////////////

    return (
        <div className='App container'>
            <br />
            <h1>List of Employees</h1>
            <br />
            <Button color='success' outline onClick={toggleCreateEmployeeModal}>ADD NEW EMPLOYEE</Button>
            <br />
            <br />
            <CustomModal
                modal={editEmployeeModal}
                toggleModal={toggleEditEmployeeModal}
                modalHandler={updateEmployeeHandler}
                textHeader='Edit Employee: '
                textSubmit='Edit'
            >
                <FormEmployee employee={selectEmployee} />
            </CustomModal>
            <CustomModal
                modal={createEmployeeModal}
                toggleModal={toggleCreateEmployeeModal}
                modalHandler={addEmployeeHandler}
                textHeader='Add Employee: '
                textSubmit='Add'
            >
                <FormEmployee
                    employee={{ name: '', sex: employeeSex[0], birthday: '', contacts: '', position: '', salary: '' }}
                />
            </CustomModal>
            <Table bordered striped size='sm'>
                <thead>
                    <tr>
                        <th>NAME</th>
                        <th>SEX</th>
                        <th>BIRTHDAY</th>
                        <th>CONTACTS</th>
                        <th>POSITION</th>
                        <th>SALARY</th>
                        <th>ACTIONS</th>
                    </tr>
                </thead>

                <tbody>
                    {employees.map((employee) => (
                        <tr key={employee._id}>
                            <td>{employee.name}</td>
                            <td>{employee.sex}</td>
                            <td>{employee.birthday}</td>
                            <td>{employee.contacts}</td>
                            <td>{employee.position}</td>
                            <td>{employee.salary}</td>
                            <td>
                                <Button color='secondary' size='sm' className='mr-2' outline onClick={() => { editEmployeeHandler(employee._id) }}>EDIT</Button>{' '}
                                <Button color='danger' size='sm' outline onClick={() => { deleteEmployeeHandler(employee._id) }}>DELETE</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default Employee;