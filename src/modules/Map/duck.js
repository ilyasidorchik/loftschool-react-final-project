import { createAction, handleActions } from 'redux-actions';
import { combineReducers } from 'redux';

import * as constants from './constants';

export const fetchMapRequest = createAction(constants.FETCH_MAP_REQUEST);
export const fetchMapSuccess = createAction(constants.FETCH_MAP_SUCCESS);
export const fetchMapFailure = createAction(constants.FETCH_MAP_FAILURE);

export const fetchAddressListRequest = createAction(constants.FETCH_ADDRESS_LIST_REQUEST);
export const fetchAddressListSuccess = createAction(constants.FETCH_ADDRESS_LIST_SUCCESS);
export const fetchAddressListFailure = createAction(constants.FETCH_ADDRESS_LIST_FAILURE);

const addressList = handleActions(
    {
      [fetchAddressListRequest]: (_state) => _state,
      [fetchAddressListSuccess]: (_state, action) => action.payload.addresses,
      [fetchAddressListFailure]: (_state) => _state
    },
    {}
);

export default combineReducers({
    addressList
});