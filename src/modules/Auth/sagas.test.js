import { cloneableGenerator } from "@redux-saga/testing-utils";
import { call, put } from "redux-saga/effects";

import { fetchAuthFlow } from "./sagas";
import { authUser } from "./api";
import { fetchAuthRequest, fetchAuthSuccess, fetchAuthFailure } from "./duck";

describe("fetchAuthFlow Saga", () => {
	const iterator = cloneableGenerator(fetchAuthFlow)(
		fetchAuthRequest({
			username: "test@test.com",
			password: "123123"
		})
	);

	it("calls api", () => {
		expect(
			iterator.next({
				username: "test@test.com",
				password: "123123"
			}).value
		).toEqual(call(authUser, "test@test.com", "123123"));
	});

	it("dispatches action FETCH_AUTH_SUCCESS if user authes successfully", () => {
		const clone = iterator.clone();
		expect(clone.next({ success: true }).value).toEqual(
			put(fetchAuthSuccess())
		);
	});

	it("dispatches action FETCH_AUTH_FAILURE if user authes with problem", () => {
		const clone = iterator.clone();
		expect(
			clone.next({ success: false, error: "Сообщение об ошибке" }).value
		).toEqual(put(fetchAuthFailure("Сообщение об ошибке")));
	});
});