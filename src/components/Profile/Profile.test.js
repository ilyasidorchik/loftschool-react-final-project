import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { shallow } from 'enzyme';

import { ProfileStyled } from './Profile';

describe("Profile Component", () => {
    it("renders without crashing", () => {
        const wrapper = render(<ProfileStyled />);

        expect(wrapper.getByTestId('Profile')).toBeTruthy();
    });
});