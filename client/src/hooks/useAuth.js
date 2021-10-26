import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { axiosService } from '../services/axiosService';
import { checkAuth, setGuest, setToken } from '../state/actions/auth';

let _isInit = false;
let _goForUser = false;

const _getLocalToken = () => {
    let localToken = localStorage.getItem('token');
    if (!localToken) {
        throw new Error('token does not exist');
    }
    return localToken;
}

const useAuth = () => {
    const { token, user, authAttempted } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const initAuth = async () => {
        try {
            dispatch(setToken(_getLocalToken()));
        } catch (error) {
            dispatch(setGuest);
        }
    }

    useEffect(() => {
        if (!_isInit) {
            _isInit = true;
            initAuth();
        }
    }, []);

    useEffect(() => {
        if (token && !_goForUser) {
            _goForUser = true;
            dispatch(checkAuth)
                .then(()=>{
                    _goForUser = false;
                })
                .catch(() => {
                    _goForUser = false;
                    localStorage.removeItem('token');
                });
        }
    }, [token]);

    const signup = async (data)=>{
        try {
            await axiosService.guestAxios.post('/signup', data);
        } catch (err) {
            throw err;
        };
    }

    const signin = async (data) => {
        try {
            const res = await axiosService.guestAxios.post('/signin', data);
            // Зберігаємо токен у local storage.
            localStorage.setItem('token', `Bearer ${res.data.signedToken}`);
            //теперь должны чекнуть локалСторе и затем сграпить данные по юзеру с сервера
            initAuth();
        } catch (err) {
            throw err;
        };
    }

    const signout = async () => {
        try {
            localStorage.removeItem('token');
            initAuth();
        } catch (err) {
            console.error(err);
        };
    }; 

    return {
        token,
        user,
        authAttempted,
        signin,
        signup,
        signout
    }
};

export default useAuth;