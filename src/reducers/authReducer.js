import { types } from '../types/types';
// cd
const initialState = {
    checking: true,
    // uid: null,
    // name: null,
};

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.authLogin:
            return {
                ...state,
                checking: false,
                uid: action.payload.uid,
                name: action.payload.name,
            };
        case types.authFinishCheking:
            return {
                ...state,
                checking: false,
            };

        case types.authLogout:
            return {
                ...initialState,
                checking: false,
            };

        default:
            return state;
    }
};
