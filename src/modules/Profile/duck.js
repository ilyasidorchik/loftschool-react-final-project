import { createAction, handleActions } from 'redux-actions';
import { combineReducers } from 'redux';

import * as constants from './constants';

export const fetchProfileRequest = createAction(constants.FETCH_PROFILE_REQUEST);
export const fetchProfileSuccess = createAction(constants.FETCH_PROFILE_SUCCESS);
export const fetchProfileFailure = createAction(constants.FETCH_PROFILE_FAILURE);

const cardName = handleActions(
    {
        [fetchProfileRequest]: () => '',
        [fetchProfileSuccess]: (_state, action) => action.payload.cardName,
        [fetchProfileFailure]: (_state, action) => action.payload
    },
    ''
);

const cardNumber = handleActions(
    {
        [fetchProfileRequest]: () => '',
        [fetchProfileSuccess]: (_state, action) => action.payload.cardNumber,
        [fetchProfileFailure]: (_state, action) => action.payload
    },
    ''
);

const expDate = handleActions(
    {
        [fetchProfileRequest]: () => '',
        [fetchProfileSuccess]: (_state, action) => action.payload.expDate,
        [fetchProfileFailure]: (_state, action) => action.payload
    },
    ''
);

const CVV = handleActions(
    {
        [fetchProfileRequest]: () => '',
        [fetchProfileSuccess]: (_state, action) => action.payload.CVV,
        [fetchProfileFailure]: (_state, action) => action.payload
    },
    ''
);

export default combineReducers({
    cardName,
    cardNumber,
    expDate,
    CVV
});