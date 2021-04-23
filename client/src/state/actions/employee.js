import getAxiosInstans from '../../services/axiosService';
import { ADD_EMPLOYEE, DELETE_EMPLOYEE, FETCH_EMLOYEE, UPDATE_EMPLOYEE } from '../reducers/employee';

export const fetchEmployee = async (dispatch) => {
    try {
        const res = await getAxiosInstans().userAxios.get('/employees/');
        dispatch({ type: FETCH_EMLOYEE, payload: res.data.docs });
    } catch (error) {
        console.error(error);
    }
};

export const addEmployee = (values) => async (dispatch) => {
    try {
        const res = await getAxiosInstans().userAxios.post('/employees/', values);
        dispatch({ type: ADD_EMPLOYEE, payload: res.data });
    } catch (error) {
        console.error(error);
    }
};

export const editEmployee = (values) => async (dispatch) => {
    try {
        const res = await getAxiosInstans().userAxios.put('/employees/' + values._id, {
            name: values.name,
            sex: values.sex,
            birthday: values.birthday,
            contacts: values.contacts,
            position: values.position,
            salary: values.salary,
        });

        dispatch({type: UPDATE_EMPLOYEE, payload: res.data});
    } catch (error) {
        console.error(error);
    }
};

export const deleteEmployee = (_id) => async (dispatch) => {
    try {
        await getAxiosInstans().userAxios.delete('/employees/' + _id);
        dispatch({type:DELETE_EMPLOYEE, payload: _id});
    } catch (error) {
        console.error(error);
    }
};