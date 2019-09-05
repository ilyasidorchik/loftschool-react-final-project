import { takeLatest, call, put } from 'redux-saga/effects';

import { fetchProfileRequest, fetchProfileSuccess, fetchProfileFailure } from './duck';
import { setProfileInLocalStorage } from './api';

function* fetchProfileWatcher() {
    yield takeLatest(fetchProfileRequest, fetchProfileFlow);
}

function* fetchProfileFlow(action) {
    try {
        yield call(setProfileInLocalStorage(action.payload));
        yield put(fetchProfileSuccess(action.payload));
    }
    catch (error) {
        yield put(fetchProfileFailure(error));
    }
}

export default function*() {
    yield fetchProfileWatcher();
}