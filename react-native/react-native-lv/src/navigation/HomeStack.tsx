import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { HomeScreen } from '../screens/home/HomeScreen';
import { AppointmentsScreen } from '../screens/appointments/AppointmentsScreen';
import { AppointmentDetailsScreen } from '../screens/appointments/AppointmentDetailsScreen';

export type HomeStackParamList = {
  Home: undefined;
  Appointments: undefined;
  AppointmentDetails: { id?: string } | undefined;
};

const Stack = createNativeStackNavigator<HomeStackParamList>();

export function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Appointments" component={AppointmentsScreen} />
      <Stack.Screen name="AppointmentDetails" component={AppointmentDetailsScreen} />
    </Stack.Navigator>
  );
}