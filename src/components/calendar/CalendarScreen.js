import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import 'moment/locale/es';
import { messages } from '../../helpers/calendar-messages-es';
import { openModal } from '../../actions/ui';
import {
    eventClearActive,
    eventSetActive,
    eventStartLoading,
} from '../../actions/calendar';
import { Navbar } from '../ui/Navbar';
import { CalendarEvent } from './CalendarEvent';
import { CalendarModal } from './CalendarModal';
import { AddNewFab } from '../ui/AddNewFab';
import { DeleteEventFab } from '../ui/DeleteEventFab';
// cd
moment.locale('es');
const localizer = momentLocalizer(moment);
export const CalendarScreen = () => {
    const { events, active } = useSelector((state) => state.calendar);
    const dispatch = useDispatch();
    const { uid } = useSelector((state) => state.auth);
    useEffect(() => {
        dispatch(eventStartLoading());
    }, [dispatch]);

    const eventStyleGetter = (event, start, end, isSelected) => {
        const style = {
            backgroundColor: event.user._id === uid ? '#367CF7' : '#465660',
            borderRadius: '0px',
            color: 'white',
            display: 'block',
            opacity: 0.7,
        };

        return {
            style,
        };
    };

    const [lastView, setLastView] = useState(
        localStorage.getItem('lastView') || 'month'
    );

    const onDoubleClick = (e) => {
        dispatch(openModal());
    };

    const onSelect = (e) => {
        dispatch(eventSetActive(e));
    };

    const onSelectedSlot = (e) => {
        dispatch(eventClearActive());
    };

    const onViewChange = (e) => {
        setLastView(e);
        localStorage.setItem('lastView', e);
    };

    return (
        <div className="calendar-screen">
            <Navbar />
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                messages={messages}
                eventPropGetter={eventStyleGetter}
                components={{
                    event: CalendarEvent,
                }}
                selectable={true}
                onSelectSlot={onSelectedSlot}
                onDoubleClickEvent={onDoubleClick}
                onSelectEvent={onSelect}
                onView={onViewChange}
                view={lastView}
            />
            <AddNewFab />
            {active && <DeleteEventFab />}
            <CalendarModal />
        </div>
    );
};
