import AsyncStorage from '@react-native-async-storage/async-storage';

const PREFIX = 'settings.';

export interface SettingsData {
  textSize: string;
  lineSpacing: string;
  spacingBetweenItems: string;
  speechSpeed: string;
  microphoneAccess: string;
  highContrastDisplay: boolean;
  boldText: boolean;
  reduceVisualClutter: boolean;
  readScreenAloud: boolean;
  readNotificationsAloud: boolean;
  voiceNavigation: boolean;
  voiceFeedbackForActions: boolean;
}

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

export const settingsStorage = {
  async load(): Promise<SettingsData> {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const settingsKeys = keys.filter((key) => key.startsWith(PREFIX));
      const items = await AsyncStorage.multiGet(settingsKeys);
      
      const settings: Partial<SettingsData> = {};
      
      for (const [key, value] of items) {
        const settingKey = key.replace(PREFIX, '') as keyof SettingsData;
        if (value !== null) {
          if (settingKey === 'highContrastDisplay' || 
              settingKey === 'boldText' || 
              settingKey === 'reduceVisualClutter' ||
              settingKey === 'readScreenAloud' ||
              settingKey === 'readNotificationsAloud' ||
              settingKey === 'voiceNavigation' ||
              settingKey === 'voiceFeedbackForActions') {
            settings[settingKey] = value === 'true';
          } else {
            settings[settingKey] = value as any;
          }
        }
      }
      
      return { ...DEFAULT_SETTINGS, ...settings };
    } catch (error) {
      return DEFAULT_SETTINGS;
    }
  },

  async save(settings: Partial<SettingsData>): Promise<void> {
    const pairs: [string, string][] = [];
    
    for (const [key, value] of Object.entries(settings)) {
      pairs.push([`${PREFIX}${key}`, String(value)]);
    }
    
    await AsyncStorage.multiSet(pairs);
  },
};
