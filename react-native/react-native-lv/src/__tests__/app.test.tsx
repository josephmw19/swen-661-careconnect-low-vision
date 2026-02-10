import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import { App } from '../App';

jest.mock('@/contexts/SettingsContext', () => ({
  useSettings: () => ({
    settings: {
      textSize: 'Max',
      lineSpacing: 'Maximum',
      spacingBetweenItems: 'Maximum',
      speechSpeed: 'Normal',
      microphoneAccess: 'Allowed',
      highContrastDisplay: false,
      boldText: true,
      reduceVisualClutter: true,
      readScreenAloud: true,
      readNotificationsAloud: true,
      voiceNavigation: false,
      voiceFeedbackForActions: true,
    },
    isLoading: false,
    updateSetting: jest.fn(),
    updateSettings: jest.fn(),
    reloadSettings: jest.fn(),
  }),
  SettingsProvider: ({ children }: any) => children,
}));

jest.mock('@/contexts/AuthContext', () => ({
  useAuth: () => ({
    user: { id: 'test', role: 'patient' }, // adjust if your app expects something else
    isLoading: false,
    signIn: jest.fn(),
    signOut: jest.fn(),
  }),
  AuthProvider: ({ children }: any) => children,
}));

describe('App', () => {
  it('renders without crashing', async () => {
    render(<App />);

    // Wait a tick for providers' async useEffects to finish
    await waitFor(() => {
      // If we got here, React had time to flush state updates.
      // We don't need to assert anything fancy yet.
      expect(true).toBe(true);
    });
  });
});