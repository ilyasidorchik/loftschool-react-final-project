import { takeLatest, call, put, fork }  from 'redux-saga/effects';

import { fetchAuthRequest, fetchAuthSuccess, fetchAuthFailure, fetchLogoutRequest } from './auth';
import { authUser } from './api';

function* fetchAuthWatcher() {
    yield takeLatest(fetchAuthRequest, fetchAuthFlow);
}

function* fetchAuthFlow(action) {
    try {
        const { username, password } = action.payload;

        const result = yield call(authUser, username, password);
        if (result.success) {
            window.localStorage.setItem('isAuthorized', result.success);
            yield put(fetchAuthSuccess(result));
        }
        else {
            throw new Error(result.error)
        }
    }
    catch (error) {
        yield put(fetchAuthFailure(error.message));
    }
}

function* fetchLogoutWatcher() {
    yield takeLatest(fetchLogoutRequest, () => {
        window.localStorage.removeItem('isAuthorized');
    });
}

export default function*() {
    yield fork(fetchAuthWatcher);
    yield fork(fetchLogoutWatcher);
};