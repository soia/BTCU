import { store } from 'react-notifications-component';
import {
    POST_VERIFICATION_USER,
    dashboardPath,
    USER_CONSTANTS,
} from '../constants';
import { alertActions } from './alert.actions';

const postVerificationUserRequested = () => ({
    type: POST_VERIFICATION_USER.POST_VERIFICATION_USER_REQUEST,
});

const postVerificationUserLoaded = data => ({
    type: POST_VERIFICATION_USER.POST_VERIFICATION_USER_SUCCESS,
    payload: data,
});

const postVerificationUserError = error => ({
    type: POST_VERIFICATION_USER.POST_VERIFICATION_USER_FAILURE,
    payload: error,
});

const fetchVerificationUserAction = postService => (token, t, history) => dispatch => {
    const success = user => ({ type: USER_CONSTANTS.LOGIN_SUCCESS, user });
    dispatch(postVerificationUserRequested());
    postService
        .verificationUser(token)
        .then(data => {
            dispatch(postVerificationUserLoaded(data));
            const item = {
                data,
            };
            localStorage.setItem('user', JSON.stringify(item));
            dispatch(success(data));
            dispatch(alertActions.success('Authorization successful'));
            history.push(`${dashboardPath}`);
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
        })
        .catch(err => {
            dispatch(postVerificationUserError(err));
            history.push('/');
            store.addNotification({
                message: t('error.invalid_verification_link'),
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
        });
};

export default fetchVerificationUserAction;
