// src/__tests__/AuthContext.test.tsx

import React from 'react';
import { Text, Button } from 'react-native';
import { render, fireEvent, waitFor } from '@testing-library/react-native';

// IMPORTANT: adjust these imports to match your AuthContext file exports
import { AuthProvider, useAuth } from '../contexts/AuthContext';

// Mock the storage module used by AuthContext
import { authStorage } from '../utils/authStorage';

jest.mock('../utils/authStorage', () => {
  return {
    authStorage: {
      isSignedIn: jest.fn(),
      setSignedIn: jest.fn(),
      getUserRole: jest.fn(),
      setUserRole: jest.fn(),
      getLastUsername: jest.fn(),
      setLastUsername: jest.fn(),
      signOut: jest.fn(),
      clearAll: jest.fn(),
    },
  };
});

function TestConsumer() {
  const auth = useAuth();

  return (
    <>
      <Text testID="loading">{String(auth.isLoading)}</Text>
      <Text testID="signedIn">{String(auth.isSignedIn)}</Text>
      <Text testID="role">{auth.userRole ?? 'null'}</Text>
      <Text testID="username">{auth.lastUsername ?? 'null'}</Text>

      <Button title="signIn" testID="signInBtn" onPress={() => auth.signIn('joey')} />
      <Button title="setRolePatient" testID="setRoleBtn" onPress={() => auth.setUserRole('patient')} />
      <Button title="signOut" testID="signOutBtn" onPress={() => auth.signOut()} />
    </>
  );
}

describe('AuthContext', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('loads initial auth state from storage', async () => {
    (authStorage.isSignedIn as jest.Mock).mockResolvedValue(true);
    (authStorage.getUserRole as jest.Mock).mockResolvedValue('patient');
    (authStorage.getLastUsername as jest.Mock).mockResolvedValue('joey');

    const screen = render(
      <AuthProvider>
        <TestConsumer />
      </AuthProvider>
    );

    // Wait until provider finishes async init
    await waitFor(() => expect(screen.getByTestId('loading').props.children).toBe('false'));

    expect(screen.getByTestId('signedIn').props.children).toBe('true');
    expect(screen.getByTestId('role').props.children).toBe('patient');
    expect(screen.getByTestId('username').props.children).toBe('joey');
  });

it('signIn updates storage and state', async () => {
  (authStorage.isSignedIn as jest.Mock).mockResolvedValue(false);
  (authStorage.getUserRole as jest.Mock).mockResolvedValue(null);
  (authStorage.getLastUsername as jest.Mock).mockResolvedValue(null);

  const screen = render(
    <AuthProvider>
      <TestConsumer />
    </AuthProvider>
  );

  await waitFor(() => expect(screen.getByTestId('loading').props.children).toBe('false'));

  fireEvent.press(screen.getByTestId('signInBtn'));

  await waitFor(() => {
    expect(authStorage.setLastUsername).toHaveBeenCalledWith('joey');
    expect(authStorage.setSignedIn).toHaveBeenCalledWith(true);

    expect(screen.getByTestId('signedIn').props.children).toBe('true');
    expect(screen.getByTestId('username').props.children).toBe('joey');

    // role is unchanged by signIn in your implementation
    expect(screen.getByTestId('role').props.children).toBe('null');
    });
  });

  it('signOut clears signed-in state and calls storage', async () => {
    (authStorage.isSignedIn as jest.Mock).mockResolvedValue(true);
    (authStorage.getUserRole as jest.Mock).mockResolvedValue('patient');
    (authStorage.getLastUsername as jest.Mock).mockResolvedValue('joey');

    const screen = render(
      <AuthProvider>
        <TestConsumer />
      </AuthProvider>
    );

    await waitFor(() => expect(screen.getByTestId('loading').props.children).toBe('false'));

    fireEvent.press(screen.getByTestId('signOutBtn'));

    await waitFor(() => {
      // depending on your implementation this could be signOut() or clearAll()
      expect(authStorage.signOut).toHaveBeenCalled();
      expect(screen.getByTestId('signedIn').props.children).toBe('false');
    });
  });

  it('setUserRole persists role and updates state', async () => {
  (authStorage.isSignedIn as jest.Mock).mockResolvedValue(false);
  (authStorage.getUserRole as jest.Mock).mockResolvedValue(null);
  (authStorage.getLastUsername as jest.Mock).mockResolvedValue(null);

  const screen = render(
    <AuthProvider>
      <TestConsumer />
    </AuthProvider>
  );

  await waitFor(() => expect(screen.getByTestId('loading').props.children).toBe('false'));

  fireEvent.press(screen.getByTestId('setRoleBtn'));

  await waitFor(() => {
    expect(authStorage.setUserRole).toHaveBeenCalledWith('patient');
    expect(screen.getByTestId('role').props.children).toBe('patient');
  });
});
});