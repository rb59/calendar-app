import { types } from '../types/types';
import { fetchWithToken } from '../helpers/fetch';
import { showErrors } from '../helpers/showErrors';
import { prepareEvents } from '../helpers/prepareEvents';
// cd
export const eventStartAddNew = (event) => {
    return async (dispatch, getState) => {
        try {
            const resp = await fetchWithToken('events', event, 'POST');
            const body = await resp.json();
            if (body.ok) {
                event.id = body.event.id;
                event.user = {
                    _id: getState().auth.uid,
                    name: getState().auth.name,
                };
                dispatch(eventAddNew(event));
            } else {
                showErrors(body);
            }
        } catch (error) {
            console.log(error);
        }
    };
};

const eventAddNew = (event) => ({
    type: types.eventAddNew,
    payload: { ...event },
});

export const eventStartLoading = () => {
    return async (dispatch) => {
        try {
            const resp = await fetchWithToken('events');
            const body = await resp.json();
            if (body.ok) {
                const events = prepareEvents(body.events);
                dispatch(eventLoad(events));
            } else {
                showErrors(body);
            }
        } catch (error) {
            console.log(error);
        }
    };
};

const eventLoad = (events) => ({
    type: types.eventLoad,
    payload: events,
});

export const eventStartUpdating = (event) => {
    return async (dispatch) => {
        try {
            const resp = await fetchWithToken(
                `events/${event.id}`,
                event,
                'PUT'
            );
            const body = await resp.json();
            if (body.ok) {
                dispatch(eventUpadate(event));
            } else {
                showErrors(body);
            }
        } catch (error) {
            console.log(error);
        }
    };
};

const eventUpadate = (event) => ({
    type: types.eventUpdate,
    payload: { ...event },
});

export const eventStartDeleting = () => {
    return async (dispatch, getState) => {
        try {
            const { id } = getState().calendar.active;
            const resp = await fetchWithToken(`events/${id}`, {}, 'DELETE');
            const body = await resp.json();
            if (body.ok) {
                dispatch(eventDelete());
            } else {
                showErrors(body);
            }
        } catch (error) {
            console.log(error);
        }
    };
};

const eventDelete = () => ({
    type: types.eventDelete,
});

export const eventSetActive = (event) => ({
    type: types.eventSetActive,
    payload: { ...event },
});

export const eventClearActive = () => ({
    type: types.eventClearActive,
});

export const eventLogoutCleaning = () => ({
    type: types.eventLogout,
});
