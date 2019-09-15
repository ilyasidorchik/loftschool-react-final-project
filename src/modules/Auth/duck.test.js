import reducer, {
	fetchAuthRequest,
	fetchAuthSuccess,
	fetchAuthFailure,
	fetchLogoutRequest
} from "./duck";
import * as constants from "./constants";

describe("actions", () => {
	it("should create an action to fetch auth request", () => {
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

	it("should create an action to fetch auth success", () => {
		const expectedAction = {
			type: constants.FETCH_AUTH_SUCCESS,
			payload: {
				success: true
			}
		};
		expect(fetchAuthSuccess({ success: true })).toEqual(expectedAction);
	});

	it("should create an action to fetch auth failure", () => {
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

	it("should create an action to fetch logout request", () => {
		const expectedAction = {
			type: constants.FETCH_LOGOUT_REQUEST
		};
		expect(fetchLogoutRequest()).toEqual(expectedAction);
	});
});