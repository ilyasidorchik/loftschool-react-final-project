import * as constants from "./constants";
import reducer, {
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

	describe("reducers", () => {
		const state0 = reducer(undefined, {});

		it("returns the initial state", () => {
			expect(state0).toEqual({
				cardName: "",
				cardNumber: "",
				expDate: "",
				CVV: ""
			});
		});

		it("handles FETCH_PROFILE_REQUEST", () => {
			const state1 = reducer(state0, {
				type: constants.fetchProfileRequest,
				payload: {
					cardName: "Ivan Ivanov",
					cardNumber: "1234123412341234",
					expDate: "01.01.2025",
					CVV: "123"
				}
			});

			expect(state1).toEqual({
				cardName: "",
				cardNumber: "",
				expDate: "",
				CVV: ""
			});
		});

		it("handles FETCH_PROFILE_SUCCESS", () => {
			const state1 = reducer(state0, {
				type: constants.fetchProfileSuccess,
				payload: {
					cardName: "Ivan Ivanov",
					cardNumber: "1234123412341234",
					expDate: "01.01.2025",
					CVV: "123"
				}
			});

			expect(state1).toEqual({
				cardName: "Ivan Ivanov",
				cardNumber: "1234123412341234",
				expDate: "01.01.2025",
				CVV: "123"
			});
		});

		it("handles FETCH_PROFILE_FAILURE", () => {
			const state1 = reducer(state0, {
				type: constants.fetchProfileFailure,
				payload: {
					cardName: "Сообщение об ошибке",
					cardNumber: "Сообщение об ошибке",
					expDate: "Сообщение об ошибке",
					CVV: "Сообщение об ошибке"
				}
			});

			expect(state1).toEqual({
				cardName: "Сообщение об ошибке",
				cardNumber: "Сообщение об ошибке",
				expDate: "Сообщение об ошибке",
				CVV: "Сообщение об ошибке"
			});
		});
	});
});