import { createAction, handleActions } from 'redux-actions';
import { combineReducers } from 'redux';

import * as constants from './constants';

export const fetchRouteRequest = createAction(constants.FETCH_ROUTE_REQUEST);
export const fetchRouteSuccess = createAction(constants.FETCH_ROUTE_SUCCESS);
export const fetchRouteFailure = createAction(constants.FETCH_ROUTE_FAILURE);

export const fetchNewRouteRequest = createAction(constants.FETCH_NEW_ROUTE_REQUEST);

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