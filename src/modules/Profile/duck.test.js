import * as constants from "./constants";
import {
	fetchProfileRequest,
	fetchProfileSuccess,
	fetchProfileFailure
} from "./duck";

describe("Profile Duck", () => {
	describe("actions", () => {
		it("creates an action to fetch profile request", () => {
			const expectedAction = {
				type: constants.FETCH_PROFILE_REQUEST,
				payload: {
					cardName: "Ivan Ivanov",
					cardNumber: "1234123412341234",
					expDate: "01.01.2025",
					CVV: "123"
				}
			};
			expect(
				fetchProfileRequest({
					cardName: "Ivan Ivanov",
					cardNumber: "1234123412341234",
					expDate: "01.01.2025",
					CVV: "123"
				})
			).toEqual(expectedAction);
		});

		it("creates an action to fetch profile success", () => {
			const expectedAction = {
				type: constants.FETCH_PROFILE_SUCCESS,
				payload: {
					cardName: "Ivan Ivanov",
					cardNumber: "1234123412341234",
					expDate: "01.01.2025",
					CVV: "123"
				}
			};
			expect(
				fetchProfileSuccess({
					cardName: "Ivan Ivanov",
					cardNumber: "1234123412341234",
					expDate: "01.01.2025",
					CVV: "123"
				})
			).toEqual(expectedAction);
		});

		it("creates an action to fetch profile failure", () => {
			const expectedAction = {
				type: constants.FETCH_PROFILE_FAILURE,
				payload: {
					error: "Сообщение об ошибке"
				}
			};
			expect(
				fetchProfileFailure({
					error: "Сообщение об ошибке"
				})
			).toEqual(expectedAction);
		});
	});
});