// src/__tests__/MainTabs.test.tsx
import React from 'react';
import { render } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';

jest.mock('@expo/vector-icons', () => {
  const React = require('react');
  const { Text } = require('react-native');
  return {
    Ionicons: (props: any) => <Text>{props.name}</Text>,
  };
});

// Mock screens so we do not pull in real providers/screens
jest.mock('@/screens/home/HomeScreen', () => ({
  HomeScreen: () => null,
}));
jest.mock('@/screens/medications/MedicationsScreen', () => ({
  MedicationsScreen: () => null,
}));
jest.mock('@/screens/medications/MedicationDetailsScreen', () => ({
  MedicationDetailsScreen: () => null,
}));
jest.mock('@/screens/tasks/TasksScreen', () => ({
  TasksScreen: () => null,
}));
jest.mock('@/screens/tasks/TaskDetailsScreen', () => ({
  TaskDetailsScreen: () => null,
}));
jest.mock('@/screens/settings/SettingsScreen', () => ({
  SettingsScreen: () => null,
}));
jest.mock('@/screens/appointments/AppointmentsScreen', () => ({
  AppointmentsScreen: () => null,
}));
jest.mock('@/screens/appointments/AppointmentDetailsScreen', () => ({
  AppointmentDetailsScreen: () => null,
}));

describe('MainTabs', () => {
  it('renders tab labels', () => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { MainTabs } = require('@/navigation/MainTabs');

    const { getByText } = render(
      <NavigationContainer>
        <MainTabs />
      </NavigationContainer>
    );

    expect(getByText('Home')).toBeTruthy();
    expect(getByText('Medications')).toBeTruthy();
    expect(getByText('Tasks')).toBeTruthy();
    expect(getByText('Settings')).toBeTruthy();
  });

  it('renders tab icons (executes tabBarIcon functions)', () => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { MainTabs } = require('@/navigation/MainTabs');

    const { queryAllByText } = render(
      <NavigationContainer>
        <MainTabs />
      </NavigationContainer>
    );

    expect(queryAllByText(/home/).length).toBeGreaterThan(0);
    expect(queryAllByText(/medical/).length).toBeGreaterThan(0);
    expect(queryAllByText(/list/).length).toBeGreaterThan(0);
    expect(queryAllByText(/settings/).length).toBeGreaterThan(0);
  });
});