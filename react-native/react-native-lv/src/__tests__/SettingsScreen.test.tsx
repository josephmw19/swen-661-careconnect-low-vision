import React from 'react';
import { fireEvent, waitFor } from '@testing-library/react-native';
import { Alert } from 'react-native';
import { SettingsScreen } from '@/screens/settings/SettingsScreen';
import { renderWithProviders } from '@/testUtils/testUtils';

jest.spyOn(Alert, 'alert').mockImplementation(() => {});

jest.mock('@/contexts/AuthContext', () => {
  const actual = jest.requireActual('@/contexts/AuthContext');
  return {
    ...actual,
    useAuth: () => ({
      signOut: jest.fn(async () => undefined),
    }),
  };
});

describe('SettingsScreen', () => {
  it('triggers sign out confirmation alert', async () => {
    const { getByTestId } = renderWithProviders(<SettingsScreen />);

    fireEvent.press(getByTestId('signOutButton'));

    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalled();
    });
  });
});