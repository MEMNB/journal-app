import { configureStore } from "@reduxjs/toolkit";
import { fireEvent, getAllByText, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { authSlice, startGoogleSignIn, startLoginWithEmailPassword } from "../../../src/store/auth";
import { MemoryRouter } from "react-router-dom";

const mockStartGoogleSingIn = jest.fn();
const mockStartLoginWithEmailPassword = jest.fn();

jest.mock('../../../src/store/auth', () => ({
    startGoogleSignIn: () => mockStartGoogleSingIn,
    startLoginWithEmailPassword: ({email, password}) => {
        return () => mockStartLoginWithEmailPassword({email, password});
    },
}));

jest.mock('react-redux', () => ({
    ...jest.requireActual('react-redux'),
    useDispatch: () => (fn) => fn(),
}));

const store = configureStore({
    reducer: {
        auth: authSlice.reducer
    },
    preloadedState: {
        auth: notAuthenticatedState
    }
});

describe('Pruebas en <LoginPage />', () => { 

    beforeEach(() => jest.clearAllMocks());

    test('debe mostrar el componente correctamente', () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                  <LoginPage />
                </MemoryRouter>                
            </Provider>            
        );

        screen.debug()
        expect(getAllByText('Login').length).toBeGreaterThanOrEqual(1);
    });

    test('botón de google de llamar el startGoogleSignIn', () => { 
        render(
            <Provider store={store}>
                <MemoryRouter>
                  <LoginPage />
                </MemoryRouter>                
            </Provider>            
        );
        const googleBtn = screen.getByLabelText('google-btn');
        fireEvent.click(googleBtn);
        expect(mockStartGoogleSingIn).toHaveBeenCalledWith();
    });

    test('debe de llamar startLoginWithEmailPassword', () => { 

        const email = 'fernando@google.com';
        const password = '123456';
        render(
            <Provider store={store}>
                <MemoryRouter>
                  <LoginPage />
                </MemoryRouter>                
            </Provider>            
        );
        const emailField = screen.getByRole('textbox', {name: 'Correo'});
        fireEvent.change(emailField, {target: {name: 'email', value: email}});

        const passwordField = screen.getByTestId('password', {name: 'Contraseña'});
        fireEvent.change(passwordField, {target: {name: 'password', value: password}});

        const loginForm = screen.getByLabelText('submit-form');
        fireEvent.submit(loginForm);

        expect(mockStartLoginWithEmailPassword).toHaveBeenCalledWith({
            email: email,
            password: password
        })
    });
});