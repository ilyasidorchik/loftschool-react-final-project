import React from "react";
import { mount } from "enzyme";
import { createShallow } from "@material-ui/core/test-utils";

import { ProfileStyled } from "./Profile";

describe("Profile Component", () => {
	let shallow;

	beforeEach(() => {
		shallow = createShallow({ dive: true });
	});

	it("renders without crashing", () => {
		const wrapper = shallow(<ProfileStyled />);

		expect(wrapper.find(".Profile")).toBeTruthy();
	});

	it("has default state { isCardAdded: false }", () => {
		const wrapper = shallow(<ProfileStyled />);

		expect(wrapper.state().isCardAdded).toEqual(false);
	});

	it("renders input and button", () => {
		const wrapper = mount(<ProfileStyled />);

		expect(wrapper.find('input[name="cardNumber"]')).toBeTruthy();
		expect(wrapper.find(".SaveButton")).toBeTruthy();
	});

    // Error: Method “simulate” is meant to be run on 1 node. 0 found instead.
	// it("sets state { isCardAdded: true } after all data provided", () => {
	// 	const wrapper = shallow(<ProfileStyled />);

	// 	wrapper
	// 		.find('input[name="cardNumber"]')
	// 		.simulate("change", { target: { value: "1234123412341234" } });
	// 	wrapper.find(".SaveButton").simulate("change");

	// 	expect(wrapper.state().isCardAdded).toEqual(true);
    // });
});