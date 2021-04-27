const initialState = {
    employees: [],
    page: null,
    pages: null,
    total: 0,
    limit: 3
}

export const FETCH_EMLOYEE = 'FETCH_EMLOYEE';
export const ADD_EMPLOYEE = 'ADD_EMPLOYEE';
export const UPDATE_EMPLOYEE = 'UPDATE_EMPLOYEE';
export const DELETE_EMPLOYEE = 'DELETE_EMPLOYEE';
export const CHANGE_PAGE = 'CHANGE_PAGE';
export const CHANGE_LIMIT = 'CHANGE_LIMIT';

const employee = (state = initialState, action) => {

    const payload = action.payload;

    switch (action.type) {
        case FETCH_EMLOYEE: {
            return {
                ...state,
                ...payload
            };
        }

        case ADD_EMPLOYEE: {
            return {
                ...state,
                employees: [...state.employees, payload]
            };
        }

        case UPDATE_EMPLOYEE: {
            //console.log('payload = ', payload);
            const index = state.employees.findIndex((el) => el._id === payload._id);

            return {
                ...state,
                employees: [
                    ...state.employees.slice(0, index),
                    payload,
                    ...state.employees.slice(index + 1)
                ]
            };
        }

        case DELETE_EMPLOYEE: {
            return {
                ...state,
                employees: state.employees.filter((el) => el._id !== payload)
            };
        }

        case CHANGE_PAGE: {
            return {
                ...state,
                page: payload
            };
        }

        case CHANGE_LIMIT: {
            return {
                ...state,
                limit: payload,
                page: 1
            }
        }

        default:
            return state;
    }
};

export default employee;