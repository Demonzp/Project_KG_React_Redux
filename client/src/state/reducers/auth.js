const initialState = {
    authAttempted: false,
    token: null,
    user: null,
}

export const AUTH_CHANGE = 'AUTH_CHANGE';
export const SET_TOKEN = 'SET_TOKEN';

const auth = (state = initialState, action) => {

    const payload = action.payload;

    switch (action.type) {
        case AUTH_CHANGE: {
            const { user, token } = payload;

            return {
                user,
                authAttempted: true,
                token,
            }
        }

        case SET_TOKEN: {
            return {
                ...state,
                token: payload
            }
        }

        default:
            return state;
    }
};

export default auth;