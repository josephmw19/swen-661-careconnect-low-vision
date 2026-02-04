import 'react-native-reanimated';
import { DarkTheme, DefaultTheme } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import * as React from 'react';
import { useColorScheme } from 'react-native';

import { Colors } from './constants/Colors';
import { Navigation } from './navigation';
import { AuthProvider } from './contexts/AuthContext';
import { SettingsProvider } from './contexts/SettingsContext';

SplashScreen.preventAutoHideAsync();

export function App() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('./assets/fonts/SpaceMono-Regular.ttf'),
  });

  React.useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  const theme =
    colorScheme === 'dark'
      ? {
          ...DarkTheme,
          colors: { ...DarkTheme.colors, primary: Colors[colorScheme ?? 'light'].tint },
        }
      : {
          ...DefaultTheme,
          colors: { ...DefaultTheme.colors, primary: Colors[colorScheme ?? 'light'].tint },
        };

  return (
    <AuthProvider>
      <SettingsProvider>
        <Navigation theme={theme} />
      </SettingsProvider>
    </AuthProvider>
  );
}
