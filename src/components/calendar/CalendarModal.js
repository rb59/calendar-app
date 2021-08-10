import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import DateTimePicker from 'react-datetime-picker';
import moment from 'moment';
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../../actions/ui';
import {
    eventStartAddNew,
    eventClearActive,
    eventStartUpdating,
} from '../../actions/calendar';
// cd
const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

Modal.setAppElement('#root');

const now = moment().minutes(0).seconds(0).add(1, 'hours');
const nowEnd = now.clone().add(1, 'hours');

const initEvent = {
    title: '',
    notes: '',
    start: now.toDate(),
    end: nowEnd.toDate(),
};

export const CalendarModal = () => {
    const dispatch = useDispatch();
    const { modalOpen } = useSelector((state) => state.ui);
    const { active } = useSelector((state) => state.calendar);

    const [startDate, setStartDate] = useState(now.toDate());
    const [endDate, setEndDate] = useState(nowEnd.toDate());
    const [titleValid, setTitleValid] = useState(true);
    const [formValues, setFormValues] = useState(initEvent);
    const { title, notes, start, end } = formValues;

    useEffect(() => {
        active ? setFormValues(active) : setFormValues(initEvent);
    }, [active, setFormValues]);

    const handleInputChange = ({ target }) => {
        setFormValues((formValues) => ({
            ...formValues,
            [target.name]: target.value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (moment(start).isSameOrAfter(moment(end))) {
            return Swal.fire(
                'Error',
                'Fecha final debe ser mayor a la inicial',
                'warning'
            );
        }
        if (title.trim().length < 2) {
            return setTitleValid(false);
        }
        if (active) {
            dispatch(eventStartUpdating(formValues));
        } else {
            dispatch(eventStartAddNew(formValues));
        }
        setTitleValid(true);
        closeThisModal();
    };

    const closeThisModal = () => {
        dispatch(closeModal());
        dispatch(eventClearActive());
        setFormValues(initEvent);
    };

    const handleStartDateChange = (e) => {
        setStartDate(e);
        setFormValues((formValues) => ({
            ...formValues,
            start: e,
        }));
    };
    const handleEndDateChange = (e) => {
        setEndDate(e);
        setFormValues((formValues) => ({
            ...formValues,
            end: e,
        }));
    };

    return (
        <Modal
            isOpen={modalOpen}
            onRequestClose={closeThisModal}
            style={customStyles}
            className="modal"
            overlayClassName="modal-fondo"
            closeTimeoutMS={200}
        >
            <h1> {active ? 'Editar evento' : 'Nuevo evento'} </h1>
            <hr />
            <form className="container" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Fecha y hora inicio</label>
                    <DateTimePicker
                        className="form-control"
                        onChange={handleStartDateChange}
                        value={startDate}
                    />
                </div>

                <div className="form-group">
                    <label>Fecha y hora fin</label>
                    <DateTimePicker
                        className="form-control"
                        onChange={handleEndDateChange}
                        value={endDate}
                        minDate={startDate}
                    />
                </div>

                <hr />
                <div className="form-group">
                    <label>Titulo y notas</label>
                    <input
                        type="text"
                        className={`form-control ${
                            !titleValid && 'is-invalid'
                        }`}
                        placeholder="Título del evento"
                        name="title"
                        autoComplete="off"
                        value={title}
                        onChange={handleInputChange}
                    />
                    <small id="emailHelp" className="form-text text-muted">
                        Una descripción corta
                    </small>
                </div>

                <div className="form-group">
                    <textarea
                        type="text"
                        className="form-control"
                        placeholder="Notas"
                        rows="5"
                        name="notes"
                        value={notes}
                        onChange={handleInputChange}
                    ></textarea>
                    <small id="emailHelp" className="form-text text-muted">
                        Información adicional
                    </small>
                </div>

                <button
                    type="submit"
                    className="btn btn-outline-primary btn-block"
                >
                    <i className="far fa-save"></i>
                    <span> Guardar</span>
                </button>
            </form>
        </Modal>
    );
};
