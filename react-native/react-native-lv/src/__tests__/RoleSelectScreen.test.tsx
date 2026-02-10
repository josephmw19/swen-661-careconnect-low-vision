import React from 'react';
import { renderWithProviders } from '@/testUtils/testUtils';
import { RoleSelectScreen } from '@/screens/auth/RoleSelectScreen';

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

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () => ({ navigate: jest.fn(), goBack: jest.fn() }),
}));

describe('RoleSelectScreen', () => {
  it('renders without crashing', () => {
    const { toJSON } = renderWithProviders(<RoleSelectScreen />);
    expect(toJSON()).toBeTruthy();
  });
});