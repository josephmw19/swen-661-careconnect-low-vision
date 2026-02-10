// src/__tests__/SettingsScreen.test.tsx
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Platform, Alert } from 'react-native';

const mockReset = jest.fn();
const mockUpdateSetting = jest.fn();
const mockSignOut = jest.fn();

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    reset: mockReset,
  }),
}));

jest.mock('@/components/AppHeader', () => ({
  AppHeader: () => null,
}));

jest.mock('@/contexts/SettingsContext', () => ({
  useSettings: () => ({
    settings: {
      textSize: 'Large',
      lineSpacing: 'Increased',
      spacingBetweenItems: 'Increased',
      highContrastDisplay: false,
      boldText: false,
      reduceVisualClutter: false,
      readScreenAloud: false,
      readNotificationsAloud: false,
      voiceNavigation: false,
      voiceFeedbackForActions: false,
      speechSpeed: 'Normal',
      microphoneAccess: 'Allowed',
    },
    updateSetting: mockUpdateSetting,
  }),
}));

jest.mock('@/contexts/AuthContext', () => ({
  useAuth: () => ({
    signOut: mockSignOut,
  }),
}));

// IMPORTANT: import after mocks
import { SettingsScreen } from '@/screens/settings/SettingsScreen';

function setPlatformOS(os: 'ios' | 'web') {
  Object.defineProperty(Platform, 'OS', {
    value: os,
    configurable: true,
  });
}

describe('SettingsScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('pressing Text Size option calls updateSetting', () => {
    setPlatformOS('ios');

    const { getByText } = render(<SettingsScreen />);

    fireEvent.press(getByText('Extra Large'));
    expect(mockUpdateSetting).toHaveBeenCalledWith('textSize', 'Extra Large');

    fireEvent.press(getByText('Max'));
    expect(mockUpdateSetting).toHaveBeenCalledWith('textSize', 'Max');
  });

  it('toggle buttons flip boolean and call updateSetting', () => {
    setPlatformOS('ios');

    const { getAllByText } = render(<SettingsScreen />);

    // Many toggles start as "Off"
    const offButtons = getAllByText('Off');

    fireEvent.press(offButtons[0]);
    expect(mockUpdateSetting).toHaveBeenCalledWith('highContrastDisplay', true);

    fireEvent.press(offButtons[1]);
    expect(mockUpdateSetting).toHaveBeenCalledWith('boldText', true);
  });

  it('native sign out uses Alert and triggers signOut via Alert button handler', async () => {
    setPlatformOS('ios');

    const alertSpy = jest.spyOn(Alert, 'alert').mockImplementation(() => {});

    mockSignOut.mockResolvedValueOnce(undefined);

    const { getByTestId } = render(<SettingsScreen />);
    fireEvent.press(getByTestId('signOutButton'));

    expect(alertSpy).toHaveBeenCalled();

    const [, , buttons] = alertSpy.mock.calls[0] as any;
    const signOutBtn = buttons.find((b: any) => b.text === 'Sign Out');
    expect(signOutBtn).toBeTruthy();

    await signOutBtn.onPress();

    expect(mockSignOut).toHaveBeenCalledTimes(1);
    expect(mockReset).toHaveBeenCalledWith({
      index: 0,
      routes: [{ name: 'Landing' }],
    });

    alertSpy.mockRestore();
  });

  it('web confirm true signs out and resets navigation', async () => {
    setPlatformOS('web');

    const confirmSpy = jest.fn(() => true);
    (globalThis as any).confirm = confirmSpy;

    mockSignOut.mockResolvedValueOnce(undefined);

    const { getByTestId } = render(<SettingsScreen />);
    fireEvent.press(getByTestId('signOutButton'));

    expect(confirmSpy).toHaveBeenCalled();

    // allow the async signOut promise to flush
    await Promise.resolve();

    expect(mockSignOut).toHaveBeenCalledTimes(1);
    expect(mockReset).toHaveBeenCalledWith({
      index: 0,
      routes: [{ name: 'Landing' }],
    });
  });

  it('web confirm false does not sign out', async () => {
    setPlatformOS('web');

    const confirmSpy = jest.fn(() => false);
    (globalThis as any).confirm = confirmSpy;

    const { getByTestId } = render(<SettingsScreen />);
    fireEvent.press(getByTestId('signOutButton'));

    expect(confirmSpy).toHaveBeenCalled();
    await Promise.resolve();

    expect(mockSignOut).not.toHaveBeenCalled();
    expect(mockReset).not.toHaveBeenCalled();
  });
});