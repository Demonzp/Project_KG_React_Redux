const initialState = {
    employees: []
}

export const FETCH_EMLOYEE = 'FETCH_EMLOYEE';
export const ADD_EMPLOYEE = 'ADD_EMPLOYEE';
export const UPDATE_EMPLOYEE = 'UPDATE_EMPLOYEE';
export const DELETE_EMPLOYEE = 'DELETE_EMPLOYEE';

const employee = (state = initialState, action) => {

    const payload = action.payload;

    switch (action.type) {
        case FETCH_EMLOYEE: {
            return {
                employees: payload
            };
        }

        case ADD_EMPLOYEE: {
            return {
                employees:[...state.employees, payload]
            };
        }

        case UPDATE_EMPLOYEE: {
            //console.log('payload = ', payload);
            const index = state.employees.findIndex((el) => el._id === payload._id);

            return {
                employees: [
                    ...state.employees.slice(0, index),
                    payload,
                    ...state.employees.slice(index + 1)
                ]
            };
        }

        case DELETE_EMPLOYEE: {
            return {
                employees: state.employees.filter((el) => el._id !== payload)
            };
        }

        default:
            return state;
    }
};

export default employee;