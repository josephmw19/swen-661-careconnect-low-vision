// jest.setup.ts

// Polyfill for React test renderer expecting DOM-like window
const g: any = globalThis as any;
g.window = g.window ?? g;
g.window.dispatchEvent = g.window.dispatchEvent ?? (() => true);
g.window.addEventListener = g.window.addEventListener ?? (() => {});
g.window.removeEventListener = g.window.removeEventListener ?? (() => {});

import mockAsyncStorage from
  '@react-native-async-storage/async-storage/jest/async-storage-mock';

jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage);

jest.mock('react-native-gesture-handler', () =>
  require('react-native-gesture-handler/jestSetup')
);

jest.mock('react-native-reanimated', () =>
  require('react-native-reanimated/mock')
);

// Expo Font + vector-icons compatibility
jest.mock('expo-font', () => ({
  isLoaded: () => true,
  loadAsync: async () => true,
  useFonts: () => [true],
}));