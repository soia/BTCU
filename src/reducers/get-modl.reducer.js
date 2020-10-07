import { GET_MODL } from '../constants';

const modl = (state, action) => {
    if (state === undefined) {
        return {
            data: {},
            loading: true,
            error: false,
            success: false,
        };
    }

    switch (action.type) {
    case GET_MODL.GET_MODL_REQUEST:
        return {
            data: {},
            loading: true,
            error: false,
            success: false,
        };

    case GET_MODL.GET_MODL_SUCCESS:
        return {
            data: action.payload,
            loading: false,
            error: false,
            success: true,
        };

    case GET_MODL.GET_MODL_FAILURE:
        return {
            data: {},
            loading: false,
            error: true,
            success: false,
        };

    default:
        return state;
    }
};

export default modl;
