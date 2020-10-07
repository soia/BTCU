import { GET_MODL } from '../constants';

const getModlRequested = () => ({
    type: GET_MODL.GET_MODL_REQUEST,
});

const getModlLoaded = data => ({
    type: GET_MODL.GET_MODL_SUCCESS,
    payload: data,
});

const getModlError = error => ({
    type: GET_MODL.GET_MODL_FAILURE,
    payload: error,
});

const getModlAction = getService => () => dispatch => {
    dispatch(getModlRequested());
    getService
        .getModl()
        .then(data => {
            dispatch(getModlLoaded(data));
        })
        .catch(err => {
            if (err.response.status === 401) {
                getService.logout();
            }
            dispatch(getModlError(err));
        });
};

export default getModlAction;
