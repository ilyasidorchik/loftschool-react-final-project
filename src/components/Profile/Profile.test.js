import React from 'react';
import { mount } from 'enzyme';
import { createShallow } from '@material-ui/core/test-utils';

import { ProfileStyled } from './Profile';

describe("Profile Component", () => {
    let shallow;

    beforeEach(() => {
        shallow = createShallow({ dive: true });
    });

    it("renders without crashing", () => {
        const wrapper = shallow(<ProfileStyled />);

        expect(wrapper.find('.Profile')).toBeTruthy();
    });
});