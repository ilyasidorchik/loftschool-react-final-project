import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render } from '@testing-library/react';

import { HeaderStyled } from './Header';

describe('Header Component', () => {
    it("renders without crashing", () => {
        const wrapper = render(
            <BrowserRouter>
                <HeaderStyled />
            </BrowserRouter>
        );

        expect(wrapper.getByTestId('Header')).toBeTruthy();
    });

    it("redirects to /map", () => {
        const wrapper = render(
            <BrowserRouter>
                <HeaderStyled />
            </BrowserRouter>
        );

        wrapper.getByTestId('MapLink').click();
        expect(location.pathname).toBe('/map');
    });

    it("redirects to /profile", () => {
        const wrapper = render(
            <BrowserRouter>
                <HeaderStyled />
            </BrowserRouter>
        );

        wrapper.getByTestId('ProfileLink').click();
        expect(location.pathname).toBe('/profile');
    });

    it("has login link if user isn't authorized", () => {
        const wrapper = render(
            <BrowserRouter>
                <HeaderStyled isAuthorized={false} />
            </BrowserRouter>
        );

        expect(wrapper.getByTestId('LoginLink')).toBeTruthy();
    });

    it("redirects to /login", () => {
        const wrapper = render(
            <BrowserRouter>
                <HeaderStyled />
            </BrowserRouter>
        );

        wrapper.getByTestId('LoginLink').click();
        expect(location.pathname).toBe('/login');
    });

    it("has logout link if user's authorized", () => {
        const wrapper = render(
            <BrowserRouter>
                <HeaderStyled isAuthorized={true} />
            </BrowserRouter>
        );

        expect(wrapper.getByTestId('LogoutLink')).toBeTruthy();
    });

    it("provides log out", () => {
        const fetchLogoutRequest = jest.fn();
        const wrapper = render(
            <BrowserRouter>
                <HeaderStyled isAuthorized={true} fetchLogoutRequest={fetchLogoutRequest} />
            </BrowserRouter>
        );

        wrapper.getByTestId('LogoutLink').click();
        expect(fetchLogoutRequest).toHaveBeenCalled();
    });
});