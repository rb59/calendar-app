import moment from 'moment';
import { types } from '../types/types';
// cd
const initialState = {
    events: [
        {
            id: new Date().getTime(),
            title: 'El cumple de mi amor',
            start: moment().toDate(),
            end: moment().add(2, 'hours').toDate(),
            bgcolor: '#fafafa',
            notes: 'Hacer la fiesta',
            user: {
                uid: 1234,
                name: 'Ronald',
            },
        },
    ],
    active: null,
};

export const calendarReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.eventAddNew:
            return {
                ...state,
                events: [...state.events, action.payload],
            };

        case types.eventSetActive:
            return {
                ...state,
                active: action.payload,
            };

        case types.eventClearActive:
            return {
                ...state,
                active: null,
            };

        case types.eventUpdate:
            return {
                ...state,
                events: state.events.map((event) =>
                    event.id === action.payload.id ? action.payload : event
                ),
            };

        case types.eventDelete:
            return {
                ...state,
                events: state.events.filter(
                    (event) => event.id !== state.active.id
                ),
                active: null,
            };

        default:
            return state;
    }
};
