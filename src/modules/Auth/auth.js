import { createAction, handleActions } from 'redux-actions';
import { combineReducers } from 'redux';

import * as constants from './constants';

export const fetchAuthRequest = createAction(constants.FETCH_AUTH_REQUEST);
export const fetchAuthSuccess = createAction(constants.FETCH_AUTH_SUCCESS);
export const fetchAuthFailure = createAction(constants.FETCH_AUTH_FAILURE);
export const fetchLogoutRequest = createAction(constants.FETCH_LOGOUT_REQUEST);

const isAuthorized = handleActions(
    {
        [fetchAuthRequest]: (state, action) => false,
        [fetchAuthSuccess]: (state, action) => true,
        [fetchAuthFailure]: (state, action) => false,
        [fetchLogoutRequest]: (state, action) => false
    },
    false
)

export default combineReducers({
    isAuthorized
});