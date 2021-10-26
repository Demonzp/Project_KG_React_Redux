import { axiosService } from '../../services/axiosService';
import { ADD_EMPLOYEE, CHANGE_LIMIT, CHANGE_PAGE, DELETE_EMPLOYEE, FETCH_EMLOYEE, UPDATE_EMPLOYEE } from '../reducers/employee';

let currentPage = 0;
let currentLimit = 0;

export const changePage = (page) => (dispatch) => {
    dispatch({ type: CHANGE_PAGE, payload: page });
    currentPage = Number(page);
    dispatch(fetchEmployee);
}

export const changeLimit = (limit) => (dispatch) => {
    dispatch({ type: CHANGE_LIMIT, payload: limit });
    currentLimit = Number(limit);
    dispatch(fetchEmployee);
}

export const fetchEmployee = async (dispatch, getState) => {
    
    try {
        
        if (currentPage <= 0) {
            currentPage = getState().employee.page;
        }

        const limit = getState().employee.limit;

        if (currentLimit <= 0) {
            currentLimit = limit;
        }

        const res = await axiosService.userAxios.get(`/employees?limit=${currentLimit}&page=${currentPage}`);

        if (res.data.page !== currentPage || limit !== currentLimit) {
            return;
        }

        currentPage = 0;
        currentLimit = 0;
        dispatch({
            type: FETCH_EMLOYEE,
            payload: {
                employees: res.data.docs,
                page: res.data.page,
                pages: res.data.pages,
                total: res.data.total
            }
        });
    } catch (error) {
        console.error(error);
    }
};

export const addEmployee = (values) => async (dispatch, getState) => {
    try {
        const limit = getState().employee.limit;
        const numEmployees = getState().employee.employees.length;
        const res = await axiosService.userAxios.post('/employees/', values);

        if (limit <= numEmployees + 1) {
            dispatch(fetchEmployee);
        } else {
            dispatch({ type: ADD_EMPLOYEE, payload: res.data });
        }
    } catch (error) {
        console.error(error);
    }
};

export const editEmployee = (values) => async (dispatch) => {
    try {
        const res = await axiosService.userAxios.put('/employees/' + values._id, {
            name: values.name,
            sex: values.sex,
            birthday: values.birthday,
            contacts: values.contacts,
            position: values.position,
            salary: values.salary,
        });

        dispatch({ type: UPDATE_EMPLOYEE, payload: res.data });
    } catch (error) {
        console.error(error);
    }
};

export const deleteEmployee = (_id) => async (dispatch, getState) => {
    const page = getState().employee.page;
    const pages = getState().employee.pages;
    const numEmployees = getState().employee.employees.length;

    try {
        await axiosService.userAxios.delete('/employees/' + _id);

        if (page !== pages) {
            dispatch(fetchEmployee);
        } else {
            if (numEmployees - 1 <= 0) {
                dispatch({ type: CHANGE_PAGE, payload: page - 1 });
            } else {
                dispatch({ type: DELETE_EMPLOYEE, payload: _id });
            }
        }
    } catch (error) {
        console.error(error);
    }
};