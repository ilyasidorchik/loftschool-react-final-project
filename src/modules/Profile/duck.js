import { createAction, handleActions } from 'redux-actions';
import { combineReducers } from 'redux';

const STORE_KEY = 'PROFILE';
export const FETCH_PROFILE_REQUEST = `${STORE_KEY}/FETCH_PROFILE_REQUEST`;
export const FETCH_PROFILE_SUCCESS = `${STORE_KEY}/FETCH_PROFILE_SUCCESS`;
export const FETCH_PROFILE_FAILURE = `${STORE_KEY}/FETCH_PROFILE_FAILURE`;

export const fetchProfileRequest = createAction(FETCH_PROFILE_REQUEST);
export const fetchProfileSuccess = createAction(FETCH_PROFILE_SUCCESS);
export const fetchProfileFailure = createAction(FETCH_PROFILE_FAILURE);

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