import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import BoxedLogin from '@/app/auth/login/page';
import userReducer from '@/redux/features/user/user-slice';
import AuthenticationService from '@/services/AuthenticationService';
import { toast } from 'sonner';

// Configuration des mocks
jest.mock('next/navigation', () => ({
    useRouter: () => ({
        push: jest.fn(),
    }),
}));

jest.mock('sonner', () => ({
    toast: {
        error: jest.fn(),
        success: jest.fn(),
    },
}));

jest.mock('@/services/AuthenticationService');

// Store Redux mock
const mockStore = configureStore({
    reducer: {
        user: userReducer,
    },
});

describe('BoxedLogin Component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('affiche correctement le formulaire de connexion', () => {
        render(
            <Provider store={mockStore}>
                <BoxedLogin />
            </Provider>
        );

        expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/mot de passe/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /connexion/i })).toBeInTheDocument();
    });

    test('gère la soumission du formulaire avec succès', async () => {
        const mockAuthResponse = {
            data: {
                token: 'fake-token',
                user: { id: 1, email: 'test@example.com' },
            },
        };

        (AuthenticationService.authenticateUser as jest.Mock).mockResolvedValue(mockAuthResponse);

        render(
            <Provider store={mockStore}>
                <BoxedLogin />
            </Provider>
        );

        fireEvent.change(screen.getByLabelText(/email/i), {
            target: { value: 'test@example.com' },
        });
        fireEvent.change(screen.getByLabelText(/mot de passe/i), {
            target: { value: 'password123' },
        });
        fireEvent.click(screen.getByRole('button', { name: /connexion/i }));

        await waitFor(() => {
            expect(AuthenticationService.authenticateUser).toHaveBeenCalledWith(
                '/auth/login',
                expect.objectContaining({
                    email: 'test@example.com',
                    password: 'password123',
                })
            );
        });
    });

    test('gère les erreurs de connexion', async () => {
        const errorMessage = 'Identifiants invalides';
        (AuthenticationService.authenticateUser as jest.Mock).mockRejectedValue({
            response: { data: { message: errorMessage } },
        });

        render(
            <Provider store={mockStore}>
                <BoxedLogin />
            </Provider>
        );

        fireEvent.click(screen.getByRole('button', { name: /connexion/i }));

        await waitFor(() => {
            expect(toast.error).toHaveBeenCalledWith('Error message', {
                description: errorMessage,
            });
        });
    });

    test('valide les champs obligatoires', async () => {
        render(
            <Provider store={mockStore}>
                <BoxedLogin />
            </Provider>
        );

        fireEvent.click(screen.getByRole('button', { name: /connexion/i }));

        expect(await screen.findByText(/email est requis/i)).toBeInTheDocument();
        expect(await screen.findByText(/mot de passe est requis/i)).toBeInTheDocument();
    });
});