import { takeLatest, call, put } from 'redux-saga/effects';

import { fetchRouteRequest, fetchRouteFailure, fetchRouteSuccess } from './route';
import { fetchRoute, drawRoute, flyTo } from '../Map/api';

function* fetchRouteWatcher() {
    yield takeLatest(fetchRouteRequest, fetchRouteFlow);
    yield takeLatest(fetchRouteSuccess, fetchRouteSuccessFlow);
}

function* fetchRouteFlow(action) {
    try {
        const { address1, address2 } = action.payload;

        const route = yield call(fetchRoute, address1, address2);
        yield put(fetchRouteSuccess(route));
        yield call(drawRoute, route);
    }
    catch (error) {
        yield put(fetchRouteFailure(error.message));
    }
}

function* fetchRouteSuccessFlow(action) {
    try {
        yield call(flyTo, action.payload[0]);
    }
    catch (error) {
        throw error;
    }
}

export default function*() {
    yield fetchRouteWatcher();
}