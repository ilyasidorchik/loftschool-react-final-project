import * as constants from "./constants";
import reducer, {
	fetchAuthRequest,
	fetchAuthSuccess,
	fetchAuthFailure,
	fetchLogoutRequest
} from "./duck";

describe("Auth Duck", () => {
	describe("actions", () => {
		it("creates an action to fetch auth request", () => {
			const expectedAction = {
				type: constants.FETCH_AUTH_REQUEST,
				payload: {
					userName: "ivanivanov",
					userPassword: "qwerty1234"
				}
			};
			expect(
				fetchAuthRequest({ userName: "ivanivanov", userPassword: "qwerty1234" })
			).toEqual(expectedAction);
		});

		it("creates an action to fetch auth success", () => {
			const expectedAction = {
				type: constants.FETCH_AUTH_SUCCESS
			};
			expect(fetchAuthSuccess()).toEqual(expectedAction);
		});

		it("creates an action to fetch auth failure", () => {
			const expectedAction = {
				type: constants.FETCH_AUTH_FAILURE,
				payload: {
					success: false,
					error: "Сообщение об ошибке"
				}
			};
			expect(
				fetchAuthFailure({ success: false, error: "Сообщение об ошибке" })
			).toEqual(expectedAction);
		});

		it("creates an action to fetch logout request", () => {
			const expectedAction = {
				type: constants.FETCH_LOGOUT_REQUEST
			};
			expect(fetchLogoutRequest()).toEqual(expectedAction);
		});
	});

	describe("reducers", () => {
		const state0 = reducer(undefined, {});

		it("returns the initial state", () => {
			expect(state0).toEqual({
				isAuthorized: false
			});
		});

		it("handles FETCH_AUTH_REQUEST", () => {
			const state1 = reducer(state0, {
				type: constants.fetchAuthRequest,
				payload: {
					userName: "ivanivanov",
					userPassword: "qwerty1234"
				}
			});

			expect(state1).toEqual({
				isAuthorized: false
			});
		});

		it("handles FETCH_AUTH_SUCCESS", () => {
			const state1 = reducer(state0, fetchAuthSuccess());

			expect(state1).toEqual({
				isAuthorized: true
			});
		});

		it("handles FETCH_AUTH_FAILURE", () => {
			const state1 = reducer(state0, {
				type: constants.fetchAuthFailure,
				payload: {
					error: "Сообщение об ошибке"
				}
			});

			expect(state1).toEqual({
				isAuthorized: false
			});
		});

		it("handles FETCH_LOGOUT_REQUEST", () => {
			const state1 = reducer(state0, fetchAuthSuccess());

			const state2 = reducer(state1, fetchLogoutRequest());

			expect(state2).toEqual({
				isAuthorized: false
			});
		});
	});
});