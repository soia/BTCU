/* eslint-disable */

import { USER_CONSTANTS } from '../constants';

export function users(state = {}, action) {
    switch (action.type) {
        case USER_CONSTANTS.GETALL_REQUEST:
            return {
                loading: true,
            };
        case USER_CONSTANTS.GETALL_SUCCESS:
            return {
                items: action.users,
            };
        case USER_CONSTANTS.GETALL_FAILURE:
            return {
                error: action.error,
            };
        case USER_CONSTANTS.DELETE_REQUEST:
            // add 'deleting:true' property to user being deleted
            return {
                ...state,
                items: state.items.map(user =>
                    user.id === action.id ? { ...user, deleting: true } : user,
                ),
            };
        case USER_CONSTANTS.DELETE_SUCCESS:
            // remove deleted user from state
            return {
                items: state.items.filter(user => user.id !== action.id),
            };
        case USER_CONSTANTS.DELETE_FAILURE:
            // remove 'deleting:true' property and add 'deleteError:[error]' property to user
            return {
                ...state,
                items: state.items.map(user => {
                    if (user.id === action.id) {
                        // make copy of user without 'deleting:true' property
                        const { deleting, ...userCopy } = user;
                        // return copy of user with 'deleteError:[error]' property
                        return { ...userCopy, deleteError: action.error };
                    }

                    return user;
                }),
            };
        default:
            return state;
    }
}
