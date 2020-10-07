import { store } from 'react-notifications-component';
import { registration } from '../services/auth.service';
import { alertActions } from './alert.actions';
import {
    USER_CONSTANTS,
    ERROR_EMAIL_TAKEN,
    ERROR_LOGIN_TAKEN,
    ERROR_REFERRAL_CODE,
} from '../constants';

const registrationAction = (user, history, t) => {
    const request = payload => ({
        type: USER_CONSTANTS.REGISTER_REQUEST,
        payload,
    });

    const success = payload => ({
        type: USER_CONSTANTS.REGISTER_SUCCESS,
        payload,
    });

    const failure = error => ({
        type: USER_CONSTANTS.REGISTER_FAILURE,
        error,
    });

    return dispatch => {
        dispatch(request());

        registration(user, history, t).then(
            response => {
                dispatch(success(response));
                dispatch(
                    alertActions.success(
                        'Check your email and verify your email address',
                    ),
                );
                history.push('/');
                store.addNotification({
                    message: t('checkEmail'),
                    type: 'success',
                    insert: 'top',
                    container: 'top-right',
                    animationIn: ['animated', 'slideInRight'],
                    animationOut: ['animated', 'zoomOut'],
                    dismiss: {
                        duration: 4000,
                        pauseOnHover: true,
                    },
                });
            },
            error => {
                dispatch(failure(error.toString()));
                dispatch(alertActions.error(error.toString()));
                let errorMessage = '';
                if (error.response.data.message === ERROR_EMAIL_TAKEN) {
                    errorMessage = t('error.email_already_taken');
                } else if (error.response.data.message === ERROR_LOGIN_TAKEN) {
                    errorMessage = t('error.login_already_taken');
                } else if (error.response.data.message === ERROR_REFERRAL_CODE) {
                    errorMessage = t('error.registrationOnlyReferral');
                } else {
                    errorMessage = error.response.data.message;
                }

                store.addNotification({
                    message: errorMessage,
                    type: 'danger',
                    insert: 'top',
                    container: 'top-right',
                    animationIn: ['animated', 'slideInRight'],
                    animationOut: ['animated', 'zoomOut'],
                    dismiss: {
                        duration: 3000,
                        pauseOnHover: true,
                    },
                });
            },
        );
    };
};

export default registrationAction;
