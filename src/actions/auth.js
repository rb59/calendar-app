import { fetchWithoutToken, fetchWithToken } from '../helpers/fetch';
import { showErrors } from '../helpers/showErrors';
import { types } from '../types/types';
import { eventLogoutCleaning } from './calendar';

export const startLogin = (email, password) => {
    return async (dispatch) => {
        const resp = await fetchWithoutToken(
            'auth',
            { email, password },
            'POST'
        );
        const body = await resp.json();
        const { uid, name, token, ok } = body;
        if (ok) {
            localStorage.setItem('token', token);
            localStorage.setItem('token-init-date', new Date().getTime());

            dispatch(login(uid, name));
        } else {
            showErrors(body);
        }
    };
};

export const startRegister = (email, password, name) => {
    return async (dispatch) => {
        const resp = await fetchWithoutToken(
            'auth/new',
            { email, password, name },
            'POST'
        );
        const body = await resp.json();
        const { uid, name: rName, token, ok } = body;
        if (ok) {
            localStorage.setItem('token', token);
            localStorage.setItem('token-init-date', new Date().getTime());

            dispatch(login(uid, rName));
        } else {
            showErrors(body);
        }
    };
};

export const startCheking = () => {
    return async (dispatch) => {
        const resp = await fetchWithToken('auth/renew');
        const body = await resp.json();
        const { uid, name, token, ok } = body;
        if (ok) {
            localStorage.setItem('token', token);
            localStorage.setItem('token-init-date', new Date().getTime());

            dispatch(login(uid, name));
        } else {
            dispatch(chekingFinish());
        }
    };
};

const login = (uid, name) => ({
    type: types.authLogin,
    payload: { uid, name },
});

const chekingFinish = () => ({
    type: types.authFinishCheking,
});

export const startLogout = () => {
    return (dispatch) => {
        localStorage.removeItem('token');
        localStorage.removeItem('token-init-date');
        dispatch(logout());
        dispatch(eventLogoutCleaning());
    };
};

const logout = () => ({
    type: types.authLogout,
}); 
