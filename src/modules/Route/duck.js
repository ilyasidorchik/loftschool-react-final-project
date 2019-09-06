import { createAction, handleActions } from 'redux-actions';
import { combineReducers } from 'redux';

const STORE_KEY = 'ROUTE';
const FETCH_ROUTE_REQUEST = `${STORE_KEY}/FETCH_ROUTE_REQUEST`;
const FETCH_ROUTE_SUCCESS = `${STORE_KEY}/FETCH_ROUTE_SUCCESS`;
const FETCH_ROUTE_FAILURE = `${STORE_KEY}/FETCH_ROUTE_FAILURE`;
const FETCH_NEW_ROUTE_REQUEST = `${STORE_KEY}/FETCH_NEW_ROUTE_REQUEST`;

export const fetchRouteRequest = createAction(FETCH_ROUTE_REQUEST);
export const fetchRouteSuccess = createAction(FETCH_ROUTE_SUCCESS);
export const fetchRouteFailure = createAction(FETCH_ROUTE_FAILURE);
export const fetchNewRouteRequest = createAction(FETCH_NEW_ROUTE_REQUEST);

const route = handleActions(
    {
        [fetchRouteRequest]: () => null,
        [fetchRouteSuccess]: (_state, action) => action.payload,
        [fetchRouteFailure]: (_state, action) => action.payload,
        [fetchNewRouteRequest]: () => null
    },
    null
);

export default combineReducers({
    route
});