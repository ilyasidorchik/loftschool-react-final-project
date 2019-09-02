import { takeLatest, put } from 'redux-saga/effects';

import { fetchProfileRequest, fetchProfileSuccess, fetchProfileFailure } from './profile';

function* fetchProfileWatcher() {
    yield takeLatest(fetchProfileRequest, fetchProfileFlow);
}

function* fetchProfileFlow(action) {
    try {
        window.localStorage.setItem('profile', JSON.stringify(action.payload));

        yield put(fetchProfileSuccess(action.payload));
    }
    catch (error) {
        yield put(fetchProfileFailure(error));
    }
}

export default function*() {
    yield fetchProfileWatcher();
}