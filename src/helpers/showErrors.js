import Swal from 'sweetalert2';

// cd
export const showErrors = (body) => {
    const { msg, errors } = body;
    let error = '';
    if (msg) {
        error = msg;
    } else {
        for (const field in errors) {
            if (Object.hasOwnProperty.call(errors, field)) {
                const { msg } = errors[field];
                error = error + `${msg}. `;
            }
        }
    }
    return Swal.fire('Error', error, 'error');
};
