import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';

import { LoginStyled, Login } from './Login';

describe('Login Component', () => {
    it("renders without crashing", () => {
        const wrapper = render(
            <BrowserRouter>
                <LoginStyled />
            </BrowserRouter>
        );

        expect(wrapper.getByTestId('Login')).toBeTruthy();
    });

    it("redirects to Map if user's authorized", () => {
        const wrapper = render(
            <BrowserRouter>
                <Login isAuthorized={true} />
            </BrowserRouter>
        );

        expect(location.pathname).toBe("/map");
    });

    it("displays form if user isn't authorized", () => {
        const wrapper = render(
            <BrowserRouter>
                <LoginStyled isAuthorized={false} />
            </BrowserRouter>
        );

        expect(wrapper.getByTestId('Login')).toBeTruthy();
    });

    it("doesn't provide sign in if user doesn't fill in the form", () => {
        const wrapper = render(
            <BrowserRouter>
                <LoginStyled isAuthorized={false} />
            </BrowserRouter>
        );

        wrapper.getByTestId('SignInButton').click();
        expect(wrapper.getByTestId('SignInButton')).toHaveProperty(
            'disabled',
            true
        );
    });

    it("doesn't provide sign in if user fills in the form incorrectly", () => {
        const wrapper = render(
            <BrowserRouter>
                <LoginStyled isAuthorized={false} fetchAuthRequest={jest.fn()} />
            </BrowserRouter>
        );

        fireEvent.change(document.querySelector('input[name="username"]'), {
            target: { value: 'johndoe' }
        });
        fireEvent.change(document.querySelector('input[name="password"]'), {
            target: { value: 'qwerty1234' }
        });

        wrapper.getByTestId('SignInButton').click();

        expect(wrapper.getByTestId('Login')).toBeTruthy();
    });

    it("provides sign in if user fills in the form gicorrectly", () => {
        const wrapper = render(
            <BrowserRouter>
                <LoginStyled isAuthorized={false} fetchAuthRequest={jest.fn()} />
            </BrowserRouter>
        );

        fireEvent.change(document.querySelector('input[name="username"]'), {
            target: { value: 'test@test.сom' }
        });
        fireEvent.change(document.querySelector('input[name="password"]'), {
            target: { value: '123123' }
        });

        wrapper.getByTestId('SignInButton').click();
        
        expect(location.pathname).toBe("/map");
    });
});