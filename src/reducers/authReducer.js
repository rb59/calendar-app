import { types } from '../types/types';
// cd
const initialState = {};

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.login:
            return {
                ...state,
            };
        case types.logout:
            return {
                ...state,
            };

        default:
            return state;
    }
};
