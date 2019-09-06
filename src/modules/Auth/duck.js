import { createAction, handleActions } from 'redux-actions';
import { combineReducers } from 'redux';

const STORE_KEY = 'AUTH';
export const FETCH_AUTH_REQUEST = `${STORE_KEY}/FETCH_AUTH_REQUEST`;
export const FETCH_AUTH_SUCCESS = `${STORE_KEY}/FETCH_AUTH_SUCCESS`;
export const FETCH_AUTH_FAILURE = `${STORE_KEY}/FETCH_AUTH_FAILURE`;
export const FETCH_LOGOUT_REQUEST = `${STORE_KEY}/FETCH_LOGOUT_REQUEST`;

export const fetchAuthRequest = createAction(FETCH_AUTH_REQUEST);
export const fetchAuthSuccess = createAction(FETCH_AUTH_SUCCESS);
export const fetchAuthFailure = createAction(FETCH_AUTH_FAILURE);
export const fetchLogoutRequest = createAction(FETCH_LOGOUT_REQUEST);

const isAuthorized = handleActions(
    {
        [fetchAuthRequest]: () => false,
        [fetchAuthSuccess]: () => true,
        [fetchAuthFailure]: () => false,
        [fetchLogoutRequest]: () => false
    },
    false
)

export default combineReducers({
    isAuthorized
});