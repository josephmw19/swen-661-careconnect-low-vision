import React from 'react';
import { render } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';

import { AuthProvider } from '@/contexts/AuthContext';
import { SettingsProvider } from '@/contexts/SettingsContext';
import { HeaderControlsProvider } from '@/contexts/HeaderControlsContext';

export function renderWithProviders(ui: React.ReactElement) {
  return render(
    <AuthProvider>
      <SettingsProvider>
        <HeaderControlsProvider>
          <NavigationContainer>{ui}</NavigationContainer>
        </HeaderControlsProvider>
      </SettingsProvider>
    </AuthProvider>
  );
}