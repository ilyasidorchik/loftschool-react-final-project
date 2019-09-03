import { takeLatest, call, put } from 'redux-saga/effects';

import { fetchRouteRequest, fetchRouteFailure, fetchRouteSuccess } from './route';
import { fetchRoute } from './api';

function* fetchRouteWatcher() {
    yield takeLatest(fetchRouteRequest, fetchRouteFlow);
}

function* fetchRouteFlow(action) {
    try {
        const { address1, address2 } = action.payload;

        const result = yield call(fetchRoute, address1, address2);
        yield put(fetchRouteSuccess(result));
    }
    catch (error) {
        yield put(fetchRouteFailure(error));
    }
}

export default function*() {
    yield fetchRouteWatcher();
}