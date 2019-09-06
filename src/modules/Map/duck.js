import { createAction, handleActions } from 'redux-actions';
import { combineReducers } from 'redux';


const STORE_KEY = 'MAP';

export const FETCH_MAP_REQUEST = `${STORE_KEY}/FETCH_MAP_REQUEST`;
export const FETCH_MAP_SUCCESS = `${STORE_KEY}/FETCH_MAP_SUCCESS`;
export const FETCH_MAP_FAILURE = `${STORE_KEY}/FETCH_MAP_FAILURE`;

export const FETCH_ADDRESS_LIST_REQUEST = `${STORE_KEY}/FETCH_ADDRESS_LIST_REQUEST`;
export const FETCH_ADDRESS_LIST_SUCCESS = `${STORE_KEY}/FETCH_ADDRESS_LIST_SUCCESS`;
export const FETCH_ADDRESS_LIST_FAILURE = `${STORE_KEY}/FETCH_ADDRESS_LIST_FAILURE`;


export const fetchMapRequest = createAction(FETCH_MAP_REQUEST);
export const fetchMapSuccess = createAction(FETCH_MAP_SUCCESS);
export const fetchMapFailure = createAction(FETCH_MAP_FAILURE);

export const fetchAddressListRequest = createAction(FETCH_ADDRESS_LIST_REQUEST);
export const fetchAddressListSuccess = createAction(FETCH_ADDRESS_LIST_SUCCESS);
export const fetchAddressListFailure = createAction(FETCH_ADDRESS_LIST_FAILURE);


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