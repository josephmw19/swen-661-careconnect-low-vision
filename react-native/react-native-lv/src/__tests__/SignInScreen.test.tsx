import React from 'react';
import { Alert } from 'react-native';
import { render, fireEvent, waitFor } from '@testing-library/react-native';

const mockNavigate = jest.fn();
const mockReplace = jest.fn();
const mockReset = jest.fn();

jest.mock('@react-navigation/native', () => {
  const actual = jest.requireActual('@react-navigation/native');
  return {
    ...actual,
    useNavigation: () => ({
      navigate: mockNavigate,
      replace: mockReplace,
      reset: mockReset,
    }),
  };
});

// Keep icons harmless
jest.mock('@expo/vector-icons', () => {
  const React = require('react');
  const { Text } = require('react-native');
  return {
    Ionicons: (props: any) => <Text>{props.name}</Text>,
  };
});

const mockSignIn = jest.fn();
let mockLastUsername: string | null = null;

jest.mock('@/contexts/AuthContext', () => ({
  useAuth: () => ({
    signIn: mockSignIn,
    lastUsername: mockLastUsername,
  }),
}));

describe('SignInScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockLastUsername = null;
    jest.spyOn(Alert, 'alert').mockImplementation(() => {});
  });

  afterEach(() => {
    (Alert.alert as jest.Mock).mockRestore?.();
  });

  it('prefills username when lastUsername exists', () => {
    mockLastUsername = 'joey.wojcik';

    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { SignInScreen } = require('@/screens/auth/SignInScreen');

    const { getByPlaceholderText } = render(<SignInScreen />);

    const usernameInput = getByPlaceholderText('Enter your username');
    expect(usernameInput.props.value).toBe('joey.wojcik');
  });

  it('shows validation alert if username is empty/whitespace', async () => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { SignInScreen } = require('@/screens/auth/SignInScreen');

    const { getByText, getByPlaceholderText } = render(<SignInScreen />);

    fireEvent.changeText(getByPlaceholderText('Enter your username'), '   ');
    fireEvent.press(getByText('Sign In'));

    expect(Alert.alert).toHaveBeenCalledWith('Error', 'Please enter a username.');
    expect(mockSignIn).not.toHaveBeenCalled();
    expect(mockReset).not.toHaveBeenCalled();
  });

  it('signs in and resets navigation stack on success', async () => {
    mockSignIn.mockResolvedValueOnce(undefined);

    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { SignInScreen } = require('@/screens/auth/SignInScreen');

    const { getByText, getByPlaceholderText } = render(<SignInScreen />);

    fireEvent.changeText(getByPlaceholderText('Enter your username'), '  user1  ');
    fireEvent.press(getByText('Sign In'));

    await waitFor(() => {
      expect(mockSignIn).toHaveBeenCalledWith('user1'); // trimmed
      expect(mockReset).toHaveBeenCalledWith({
        index: 0,
        routes: [{ name: 'Main' }],
      });
    });
  });

  it('shows error alert if signIn throws', async () => {
    mockSignIn.mockRejectedValueOnce(new Error('boom'));

    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { SignInScreen } = require('@/screens/auth/SignInScreen');

    const { getByText, getByPlaceholderText } = render(<SignInScreen />);

    fireEvent.changeText(getByPlaceholderText('Enter your username'), 'user2');
    fireEvent.press(getByText('Sign In'));

    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith(
        'Error',
        'Failed to sign in. Please try again.'
      );
    });
  });

  it('toggles password visibility', () => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { SignInScreen } = require('@/screens/auth/SignInScreen');

    const { getByTestId } = render(<SignInScreen />);

    const passwordInput = getByTestId('password-input');
    expect(passwordInput.props.secureTextEntry).toBe(true);

    fireEvent.press(getByTestId('toggle-password-visibility'));

    const passwordInputAfter = getByTestId('password-input');
    expect(passwordInputAfter.props.secureTextEntry).toBe(false);
  });

  it('navigates to ForgotPassword with username mode', () => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { SignInScreen } = require('@/screens/auth/SignInScreen');

    const { getByText } = render(<SignInScreen />);

    fireEvent.press(getByText('Forgot username?'));
    expect(mockNavigate).toHaveBeenCalledWith('ForgotPassword', { mode: 'username' });
  });

  it('navigates to ForgotPassword with password mode', () => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { SignInScreen } = require('@/screens/auth/SignInScreen');

    const { getByText } = render(<SignInScreen />);

    fireEvent.press(getByText('Forgot password?'));
    expect(mockNavigate).toHaveBeenCalledWith('ForgotPassword', { mode: 'password' });
  });

  it('replaces to Landing when tapping Return to Welcome', () => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { SignInScreen } = require('@/screens/auth/SignInScreen');

    const { getByText } = render(<SignInScreen />);

    fireEvent.press(getByText('Return to Welcome'));
    expect(mockReplace).toHaveBeenCalledWith('Landing');
  });
});