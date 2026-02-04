import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { settingsStorage, SettingsData } from '../utils/settingsStorage';

interface SettingsContextType {
  settings: SettingsData;
  isLoading: boolean;
  updateSetting: <K extends keyof SettingsData>(key: K, value: SettingsData[K]) => Promise<void>;
  updateSettings: (updates: Partial<SettingsData>) => Promise<void>;
  reloadSettings: () => Promise<void>;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

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

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<SettingsData>(DEFAULT_SETTINGS);
  const [isLoading, setIsLoading] = useState(true);

  const loadSettings = useCallback(async () => {
    try {
      setIsLoading(true);
      const loaded = await settingsStorage.load();
      setSettings(loaded);
    } catch (error) {
      console.error('Error loading settings:', error);
      setSettings(DEFAULT_SETTINGS);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadSettings();
  }, [loadSettings]);

  const updateSetting = useCallback(async <K extends keyof SettingsData>(
    key: K,
    value: SettingsData[K]
  ) => {
    try {
      const updated = { ...settings, [key]: value };
      setSettings(updated);
      await settingsStorage.save({ [key]: value });
    } catch (error) {
      console.error('Error updating setting:', error);
      // Revert on error
      await loadSettings();
      throw error;
    }
  }, [settings, loadSettings]);

  const updateSettings = useCallback(async (updates: Partial<SettingsData>) => {
    try {
      const updated = { ...settings, ...updates };
      setSettings(updated);
      await settingsStorage.save(updates);
    } catch (error) {
      console.error('Error updating settings:', error);
      // Revert on error
      await loadSettings();
      throw error;
    }
  }, [settings, loadSettings]);

  const reloadSettings = useCallback(async () => {
    await loadSettings();
  }, [loadSettings]);

  const value: SettingsContextType = {
    settings,
    isLoading,
    updateSetting,
    updateSettings,
    reloadSettings,
  };

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
}
