import { combineReducers } from 'redux';
import { fork } from 'redux-saga/effects';

import auth, { sagas as authSagas } from './Auth';
import profile, { sagas as profileSagas } from './Profile';
import map, { sagas as mapSagas } from './Map';

export default combineReducers({
    auth,
    profile,
    map
});

export function* rootSaga() {
    yield fork(authSagas);
    yield fork(profileSagas);
    yield fork(mapSagas);
}