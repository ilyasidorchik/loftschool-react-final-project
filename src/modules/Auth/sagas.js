import { takeLatest, call, put, fork } from "redux-saga/effects";

import {
	fetchAuthRequest,
	fetchAuthSuccess,
	fetchAuthFailure,
	fetchLogoutRequest
} from "./duck";
import { authUser } from "./api";

function* fetchAuthWatcher() {
	yield takeLatest(fetchAuthRequest, fetchAuthFlow);
}

export function* fetchAuthFlow(action) {
	try {
		const { username, password } = action.payload;

		const result = yield call(authUser, username, password);
		if (result.success) {
			window.localStorage.setItem(
				"authData",
				JSON.stringify({ username, password })
			);
			yield put(fetchAuthSuccess());
		} else {
			throw new Error(result.error);
		}
	} catch (error) {
		yield put(fetchAuthFailure(error.message));
	}
}

function* fetchLogoutWatcher() {
	yield takeLatest(fetchLogoutRequest, () => {
		window.localStorage.removeItem("authData");
	});
}

export default function*() {
	yield fork(fetchAuthWatcher);
	yield fork(fetchLogoutWatcher);
}