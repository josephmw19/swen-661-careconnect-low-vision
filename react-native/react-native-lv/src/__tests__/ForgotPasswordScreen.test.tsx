import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Alert } from 'react-native';

jest.mock('@expo/vector-icons', () => {
  const React = require('react');
  const { Text } = require('react-native');
  return {
    Ionicons: (props: any) => <Text>{props.name}</Text>,
  };
});

// Mock navigation hooks
const mockGoBack = jest.fn();

jest.mock('@react-navigation/native', () => {
  const actual = jest.requireActual('@react-navigation/native');
  return {
    ...actual,
    useNavigation: () => ({
      goBack: mockGoBack,
    }),
    useRoute: jest.fn(),
  };
});

const { useRoute } = jest.requireMock('@react-navigation/native');

describe('ForgotPasswordScreen', () => {
  const alertSpy = jest.spyOn(Alert, 'alert').mockImplementation(() => {});

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders password mode by default when no params are provided', () => {
    useRoute.mockReturnValue({ params: undefined });

    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { ForgotPasswordScreen } = require('@/screens/auth/ForgotPasswordScreen');

    const { getByText } = render(<ForgotPasswordScreen />);

    expect(getByText('Forgot Password')).toBeTruthy();
    expect(
      getByText('Enter your email address and we will send a password reset link.')
    ).toBeTruthy();
    expect(getByText('Send Reset Link')).toBeTruthy();
  });

  it('renders username mode when route param mode=username', () => {
    useRoute.mockReturnValue({ params: { mode: 'username' } });

    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { ForgotPasswordScreen } = require('@/screens/auth/ForgotPasswordScreen');

    const { getByText } = render(<ForgotPasswordScreen />);

    expect(getByText('Forgot Username')).toBeTruthy();
    expect(
      getByText('Enter your email address and we will send your username.')
    ).toBeTruthy();
    expect(getByText('Send Username')).toBeTruthy();
  });

  it('shows validation alert when email is empty/whitespace', () => {
    useRoute.mockReturnValue({ params: { mode: 'password' } });

    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { ForgotPasswordScreen } = require('@/screens/auth/ForgotPasswordScreen');

    const { getByText, getByPlaceholderText } = render(<ForgotPasswordScreen />);

    fireEvent.changeText(getByPlaceholderText('name@example.com'), '   ');
    fireEvent.press(getByText('Send Reset Link'));

    expect(alertSpy).toHaveBeenCalledWith('Error', 'Please enter an email address.');
  });

  it('shows success alert when email is provided', () => {
    useRoute.mockReturnValue({ params: { mode: 'password' } });

    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { ForgotPasswordScreen } = require('@/screens/auth/ForgotPasswordScreen');

    const { getByText, getByPlaceholderText } = render(<ForgotPasswordScreen />);

    fireEvent.changeText(getByPlaceholderText('name@example.com'), 'test@example.com');
    fireEvent.press(getByText('Send Reset Link'));

    expect(alertSpy).toHaveBeenCalledWith('Success', 'Request sent. (Demo mode, no backend)');
  });

  it('calls navigation.goBack when Back is pressed', () => {
    useRoute.mockReturnValue({ params: { mode: 'password' } });

    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { ForgotPasswordScreen } = require('@/screens/auth/ForgotPasswordScreen');

    const { getByText, getByTestId } = render(<ForgotPasswordScreen />);

    // If you added testID="back-button", use this:
    if (getByTestId) {
      fireEvent.press(getByTestId('back-button'));
    } else {
      // Fallback: press the "Back" text
      fireEvent.press(getByText('Back'));
    }

    expect(mockGoBack).toHaveBeenCalledTimes(1);
  });
});