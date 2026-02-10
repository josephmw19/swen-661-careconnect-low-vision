import React from 'react';
import { renderWithProviders } from '@/testUtils/testUtils';
import { HomeScreen } from '@/screens/home/HomeScreen';

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

describe('HomeScreen', () => {
  it('renders key home content', () => {
    const { getByText } = renderWithProviders(<HomeScreen />);
    expect(getByText('CareConnect')).toBeTruthy();
    expect(getByText('Upcoming Appointments')).toBeTruthy();
    expect(getByText('View All Appointments')).toBeTruthy();
  });
});