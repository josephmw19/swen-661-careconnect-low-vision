// src/__tests__/SettingsContext.test.tsx
import React from 'react';
import { Text, Button } from 'react-native';
import { render, waitFor, fireEvent } from '@testing-library/react-native';

import { SettingsProvider, useSettings } from '@/contexts/SettingsContext';
import { settingsStorage } from '@/utils/settingsStorage';

let consoleErrorSpy: jest.SpyInstance;

beforeEach(() => {
  consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
});

afterEach(() => {
  consoleErrorSpy.mockRestore();
});

// Mock settingsStorage (load/save) used by the provider
jest.mock('@/utils/settingsStorage', () => ({
  settingsStorage: {
    load: jest.fn(),
    save: jest.fn(),
  },
}));

type SettingsData = {
  textSize: 'Large' | 'Extra Large' | 'Max';
  lineSpacing: 'Increased' | 'Maximum';
  spacingBetweenItems: 'Increased' | 'Maximum';
  speechSpeed: 'Slow' | 'Normal' | 'Fast';
  microphoneAccess: 'Allowed' | 'Not Allowed';
  highContrastDisplay: boolean;
  boldText: boolean;
  reduceVisualClutter: boolean;
  readScreenAloud: boolean;
  readNotificationsAloud: boolean;
  voiceNavigation: boolean;
  voiceFeedbackForActions: boolean;
};

const DEFAULT_SETTINGS: SettingsData = {
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
};

// Small consumer component to observe context values and trigger updates
function Consumer() {
  const { settings, isLoading, updateSetting } = useSettings();

  return (
    <>
      <Text testID="loading">{String(isLoading)}</Text>
      <Text testID="textSize">{settings.textSize}</Text>
      <Button
        title="setLarge"
        testID="setLarge"
        onPress={() => updateSetting('textSize', 'Large')}
      />
    </>
  );
}

describe('SettingsContext', () => {
  const loadMock = settingsStorage.load as jest.Mock;
  const saveMock = settingsStorage.save as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('loads settings on mount (success path)', async () => {
    const loaded: SettingsData = {
      ...DEFAULT_SETTINGS,
      textSize: 'Large',
      highContrastDisplay: true,
    };

    loadMock.mockResolvedValueOnce(loaded);

    const { getByTestId } = render(
      <SettingsProvider>
        <Consumer />
      </SettingsProvider>
    );

    // Eventually, loading should flip false and settings should reflect "loaded"
    await waitFor(() => {
      expect(getByTestId('loading').props.children).toBe('false');
      expect(getByTestId('textSize').props.children).toBe('Large');
    });

    expect(loadMock).toHaveBeenCalledTimes(1);
  });

  it('falls back to DEFAULT_SETTINGS when load fails', async () => {
    loadMock.mockRejectedValueOnce(new Error('load failed'));

    const { getByTestId } = render(
      <SettingsProvider>
        <Consumer />
      </SettingsProvider>
    );

    await waitFor(() => {
      expect(getByTestId('loading').props.children).toBe('false');
      expect(getByTestId('textSize').props.children).toBe('Max');
    });

    expect(loadMock).toHaveBeenCalledTimes(1);
  });

  it('updateSetting updates state and calls save (success path)', async () => {
    loadMock.mockResolvedValueOnce(DEFAULT_SETTINGS);
    saveMock.mockResolvedValueOnce(undefined);

    const { getByTestId } = render(
      <SettingsProvider>
        <Consumer />
      </SettingsProvider>
    );

    // Wait for initial load to finish
    await waitFor(() => {
      expect(getByTestId('loading').props.children).toBe('false');
    });

    fireEvent.press(getByTestId('setLarge'));

    // State update should be reflected
    await waitFor(() => {
      expect(getByTestId('textSize').props.children).toBe('Large');
    });

    // save should persist only the changed key
    expect(saveMock).toHaveBeenCalledTimes(1);
    expect(saveMock).toHaveBeenCalledWith({ textSize: 'Large' });
  });

  it('updateSetting reverts via reloadSettings and rethrows when save fails', async () => {
    // Initial mount load returns default
    loadMock.mockResolvedValueOnce(DEFAULT_SETTINGS);

    // When save fails, provider calls loadSettings() again, mock a "reverted" state.
    const reverted: SettingsData = { ...DEFAULT_SETTINGS, textSize: 'Max' };
    loadMock.mockResolvedValueOnce(reverted);

    saveMock.mockRejectedValueOnce(new Error('save failed'));

    // Consumer that captures the promise rejection so the test can assert it
    function ErrorCatchingConsumer() {
      const { settings, isLoading, updateSetting } = useSettings();
      const [err, setErr] = React.useState<string | null>(null);

      return (
        <>
          <Text testID="loading">{String(isLoading)}</Text>
          <Text testID="textSize">{settings.textSize}</Text>
          <Text testID="err">{err ?? ''}</Text>
          <Button
            title="setLarge"
            testID="setLarge"
            onPress={async () => {
              try {
                await updateSetting('textSize', 'Large');
              } catch (e: any) {
                setErr(e?.message ?? 'error');
              }
            }}
          />
        </>
      );
    }

    const { getByTestId } = render(
      <SettingsProvider>
        <ErrorCatchingConsumer />
      </SettingsProvider>
    );

    await waitFor(() => {
      expect(getByTestId('loading').props.children).toBe('false');
      expect(getByTestId('textSize').props.children).toBe('Max');
    });

    fireEvent.press(getByTestId('setLarge'));

    // It may briefly become Large before reverting. We assert final state and error message.
    await waitFor(() => {
      expect(getByTestId('err').props.children).toBe('save failed');
      expect(getByTestId('textSize').props.children).toBe('Max');
    });

    // load called twice: initial mount + revert reload
    expect(loadMock).toHaveBeenCalledTimes(2);
    expect(saveMock).toHaveBeenCalledTimes(1);
  });

  it('useSettings throws if used outside SettingsProvider', () => {
    // Silence React error boundary logging for this test
    const spy = jest.spyOn(console, 'error').mockImplementation(() => {});

    function BadConsumer() {
      useSettings();
      return null;
    }

    expect(() => render(<BadConsumer />)).toThrow(
      'useSettings must be used within a SettingsProvider'
    );

    spy.mockRestore();
  });
});