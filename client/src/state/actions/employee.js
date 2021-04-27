import getAxiosInstans from '../../services/axiosService';
import { ADD_EMPLOYEE, CHANGE_LIMIT, CHANGE_PAGE, DELETE_EMPLOYEE, FETCH_EMLOYEE, UPDATE_EMPLOYEE } from '../reducers/employee';

export const changePage = (page)=>(dispatch)=>{
    dispatch({type:CHANGE_PAGE, payload:page});
    dispatch(fetchEmployee);
}

export const changeLimit = (limit)=>(dispatch, getState)=>{
    const page = getState().employee.page;
    dispatch({type:CHANGE_LIMIT, payload:limit});
    if(page===1){
        dispatch(fetchEmployee);
    }
}

export const fetchEmployee = async (dispatch, getState) => {
    const limit = getState().employee.limit;
    const page = getState().employee.page;

    try {
        const res = await getAxiosInstans().userAxios.get(`/employees?limit=${limit}&page=${page}`);
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
    const limit = getState().employee.limit;
    const numEmployees = getState().employee.employees.length;

    try {
        const res = await getAxiosInstans().userAxios.post('/employees/', values);

        if(limit<=numEmployees+1){
            dispatch(fetchEmployee);
        }else{
            dispatch({ type: ADD_EMPLOYEE, payload: res.data });
        }
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
        await getAxiosInstans().userAxios.delete('/employees/' + _id);

        if(page!==pages){
            dispatch(fetchEmployee);
        }else{
            if(numEmployees-1<=0){
                dispatch({type:CHANGE_PAGE, payload:page-1});
            }else{
                dispatch({ type: DELETE_EMPLOYEE, payload: _id });
            }
        }
    } catch (error) {
        console.error(error);
    }
};