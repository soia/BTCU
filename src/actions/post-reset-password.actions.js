import { store } from 'react-notifications-component';
import { POST_RESET_PASSWORD, ERROR_TOKEN_INVALID } from '../constants';

const postResetPasswordRequested = () => ({
    type: POST_RESET_PASSWORD.FETCH_RESET_PASSWORD_REQUEST,
});

const postResetPasswordLoaded = data => ({
    type: POST_RESET_PASSWORD.FETCH_RESET_PASSWORD_SUCCESS,
    payload: data,
});

const postResetPasswordError = error => ({
    type: POST_RESET_PASSWORD.FETCH_RESET_PASSWORD_FAILURE,
    payload: error,
});

const fetchResetPasswordAction = postService => (newPassword, t, history) => dispatch => {
    dispatch(postResetPasswordRequested());
    postService
        .resetPassword(newPassword)
        .then(data => {
            dispatch(postResetPasswordLoaded(data));
            store.addNotification({
                message: t('passwordChangedSuccessfully'),
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
            history.push('/');
        })
        .catch(err => {
            dispatch(postResetPasswordError(err.response.data.message));
            let errorMessage = '';
            if (err.response.data.message === ERROR_TOKEN_INVALID) {
                errorMessage = t('error.invalid_password_recovery_link');
                history.push('/');
            } else {
                errorMessage = err.response.data.message;
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
        });
};

export default fetchResetPasswordAction;
