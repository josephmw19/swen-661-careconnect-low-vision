import React from 'react';
import { NavigationContainer, Theme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ActivityIndicator, View, StyleSheet } from 'react-native';

import { RootStackParamList } from './types';
import { useAuth } from '../contexts/AuthContext';

// Auth screens
import { LandingScreen } from '../screens/auth/LandingScreen';
import { RoleSelectScreen } from '../screens/auth/RoleSelectScreen';
import { SignInScreen } from '../screens/auth/SignInScreen';
import { ForgotPasswordScreen } from '../screens/auth/ForgotPasswordScreen';

// Main app screens
import { MainTabs } from './MainTabs';
import { MedicationDetailsScreen } from '../screens/medications/MedicationDetailsScreen';
import { TaskDetailsScreen } from '../screens/tasks/TaskDetailsScreen';
import { AppointmentDetailsScreen } from '../screens/appointments/AppointmentDetailsScreen';
import { AppointmentsScreen } from '../screens/appointments/AppointmentsScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export function Navigation({ theme }: { theme: Theme }) {
  const { isSignedIn, isLoading } = useAuth();

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4285F4" />
      </View>
    );
  }

  return (
    <NavigationContainer theme={theme}>
      <Stack.Navigator 
        screenOptions={{ headerShown: false }}
        initialRouteName={isSignedIn ? "Main" : "Landing"}
        key={isSignedIn ? "main" : "auth"}
      >
        {/* Auth screens */}
        <Stack.Screen name="Landing" component={LandingScreen} />
        <Stack.Screen name="RoleSelect" component={RoleSelectScreen} />
        <Stack.Screen name="SignIn" component={SignInScreen} />
        <Stack.Screen 
          name="ForgotPassword" 
          component={ForgotPasswordScreen}
          initialParams={{ mode: 'password' }}
        />
        
        {/* Main app screens */}
        <Stack.Screen name="Main" component={MainTabs} />
    
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    backgroundColor: '#1A1D24',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
