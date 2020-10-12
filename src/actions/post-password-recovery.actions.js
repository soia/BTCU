import { store } from 'react-notifications-component';
import { POST_PASSWORD_RECOVERY, ERROR_NO_USER } from '../constants';

const postPasswordRecoveryRequested = () => ({
    type: POST_PASSWORD_RECOVERY.FETCH_PASSWORD_RECOVERY_REQUEST,
});

const postPasswordRecoveryLoaded = data => ({
    type: POST_PASSWORD_RECOVERY.FETCH_PASSWORD_RECOVERY_SUCCESS,
    payload: data,
});

const postPasswordRecoveryError = error => ({
    type: POST_PASSWORD_RECOVERY.FETCH_PASSWORD_RECOVERY_FAILURE,
    payload: error,
});

const fetchPasswordRecoveryAction = postService => (email, t, history) => dispatch => {
    dispatch(postPasswordRecoveryRequested());
    postService
        .passwordRecovery(email)
        .then(data => {
            dispatch(postPasswordRecoveryLoaded(data));
            store.addNotification({
                message: t('checkEmailAndFollowLink'),
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
            dispatch(postPasswordRecoveryError(err));
            let errorMessage = '';
            if (err.response.data.message === ERROR_NO_USER) {
                errorMessage = t('error.user_is_not_found');
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

export default fetchPasswordRecoveryAction;
