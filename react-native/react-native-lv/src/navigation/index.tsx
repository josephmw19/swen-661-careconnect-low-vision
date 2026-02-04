import React, { useEffect, useState, useCallback } from 'react';
import { NavigationContainer, Theme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ActivityIndicator, View, StyleSheet } from 'react-native';

import { RootStackParamList } from './types';
import { authStorage } from '../utils/authStorage';

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
  const [isLoading, setIsLoading] = useState(true);
  const [isSignedIn, setIsSignedIn] = useState(false);

  const checkAuth = useCallback(async () => {
    try {
      const signedIn = await authStorage.isSignedIn();
      setIsSignedIn(signedIn);
    } catch (error) {
      console.error('Error checking auth:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4285F4" />
      </View>
    );
  }

  return (
    <NavigationContainer theme={theme}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!isSignedIn ? (
          // Auth stack
          <>
            <Stack.Screen name="Landing" component={LandingScreen} />
            <Stack.Screen name="RoleSelect" component={RoleSelectScreen} />
            <Stack.Screen name="SignIn" component={SignInScreen} />
            <Stack.Screen 
              name="ForgotPassword" 
              component={ForgotPasswordScreen}
              initialParams={{ mode: 'password' }}
            />
          </>
        ) : (
          // Main app stack
          <>
            <Stack.Screen name="Main" component={MainTabs} />
            <Stack.Screen name="MedicationDetails" component={MedicationDetailsScreen} />
            <Stack.Screen name="TaskDetails" component={TaskDetailsScreen} />
            <Stack.Screen name="Appointments" component={AppointmentsScreen} />
            <Stack.Screen name="AppointmentDetails" component={AppointmentDetailsScreen} />
          </>
        )}
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
