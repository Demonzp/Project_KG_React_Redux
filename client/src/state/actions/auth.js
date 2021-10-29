import { AUTH_CHANGE, SET_TOKEN } from '../reducers/auth';
import { axiosService } from '../../services/axiosService';

export const checkAuth = async (dispatch, getState) => {
    const token = getState().auth.token;
    try {
        const res = await axiosService.userAxios.get('/user');
        dispatch({type:AUTH_CHANGE, payload:{user:res.data, token}});
    } catch (err) {
        console.error(err);
        dispatch({type:AUTH_CHANGE, payload:{user:null, token:null}});
        console.log('Authorization process failed!');
        throw err;
    }
};

export const setToken = (token) => (dispatch) => {
    axiosService.setUserAxios(token);
    dispatch({ type: SET_TOKEN, payload: token });
};

export const setGuest = (dispatch) => {
    axiosService.setUserAxios(null);
    dispatch({type:AUTH_CHANGE, payload:{user:null, token:null}});
};
