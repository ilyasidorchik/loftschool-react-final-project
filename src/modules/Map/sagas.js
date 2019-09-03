import { takeLatest, put, call } from "redux-saga/effects";

import {
    fetchMapRequest,
    fetchMapSuccess,
    fetchMapFailure,
    fetchAddressListRequest,
    fetchAddressListSuccess,
    fetchAddressListFailure
} from "./map";
import { mapInit, fetchAddressList } from "./api.js";

function* fetchMapWatcher() {
    yield takeLatest(fetchMapRequest, fetchMapFlow);
    yield takeLatest(fetchAddressListRequest, fetchAddressListFlow);
}
  
function* fetchMapFlow(action) {
    const mapContainer = action.payload;
  
    try {
        const map = yield call(mapInit, mapContainer);
        if (map) {
            yield put(fetchMapSuccess());
            yield put(fetchAddressListRequest());
        }
    }
    catch (error) {
        yield put(fetchMapFailure(error.message));
    }
}

function* fetchAddressListFlow() {
    try {
        const addresses = yield call(fetchAddressList);
        if (addresses) yield put(fetchAddressListSuccess(addresses));
    }
    catch (error) {
        yield put(fetchAddressListFailure(error.message));
    }
}

 export default function*() {
    yield fetchMapWatcher();
 }