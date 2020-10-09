import { store } from 'react-notifications-component';
import {
    USER_CONSTANTS,
    ERROR_LOGIN_PASSWORD_INVALID,
    ERROR_USER_NOT_VERIFICATION,
} from '../constants';
import { login } from '../services/auth.service';
import { alertActions } from '.';

const loginAction = (laginValue, password, captchaToken, history, t) => {
    const request = user => ({ type: USER_CONSTANTS.LOGIN_REQUEST, user });
    const success = user => ({ type: USER_CONSTANTS.LOGIN_SUCCESS, user });
    const twoFa = user => ({ type: USER_CONSTANTS.LOGIN_TWO_FA_SUCCESS, user });
    const failure = error => ({ type: USER_CONSTANTS.LOGIN_FAILURE, error });

    return dispatch => {
        dispatch(request({ laginValue }));

        login(laginValue, password, captchaToken, history).then(
            user => {
                if (user.data.login_two_fa) {
                    dispatch(twoFa(user.data));
                } else {
                    localStorage.setItem('user', JSON.stringify(user));
                    dispatch(success(user.data));
                    dispatch(alertActions.success('Authorization successful'));
                    history.push('/');
                    store.addNotification({
                        message: t('authorizationSuccessful'),
                        type: 'success',
                        insert: 'top',
                        container: 'top-right',
                        animationIn: ['animated', 'slideInRight'],
                        animationOut: ['animated', 'zoomOut'],
                        dismiss: {
                            duration: 3000,
                            pauseOnHover: true,
                        },
                    });
                }
            },
            error => {
                dispatch(failure(error.toString()));
                dispatch(alertActions.error(error.toString()));
                let errorMessage = '';
                if (error.response.data.message === ERROR_LOGIN_PASSWORD_INVALID) {
                    errorMessage = t('error.invalid_email_or_password');
                } else if (error.response.data.message === ERROR_USER_NOT_VERIFICATION) {
                    errorMessage = t('checkEmail');
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

export default loginAction;
