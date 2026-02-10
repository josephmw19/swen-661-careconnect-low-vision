// src/__tests__/AppointmentDetailsScreen.test.tsx
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';

// Mock AppHeader so we don’t pull in provider dependencies
jest.mock('@/components/AppHeader', () => ({
  AppHeader: () => null,
}));

// Make Ionicons render its name as text so we can query it
jest.mock('@expo/vector-icons', () => {
  const React = require('react');
  const { Text } = require('react-native');
  return {
    Ionicons: (props: any) => <Text>{props.name}</Text>,
  };
});

// Mock navigation hooks
const mockGoBack = jest.fn();

jest.mock('@react-navigation/native', () => {
  const actual = jest.requireActual('@react-navigation/native');
  return {
    ...actual,
    useNavigation: () => ({
      goBack: mockGoBack,
    }),
    useRoute: jest.fn(),
  };
});

const { useRoute } = jest.requireMock('@react-navigation/native');

describe('AppointmentDetailsScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders all provided appointment fields', () => {
    useRoute.mockReturnValue({
      params: {
        id: 'a1',
        doctorName: 'Dr. Smith',
        clinicName: 'Primary Care',
        dateTime: 'Feb 10, 2026 0900',
        location: 'Fort Meade Clinic',
        appointmentType: 'Follow-up',
      },
    });

    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { AppointmentDetailsScreen } = require('@/screens/appointments/AppointmentDetailsScreen');

    const { getByText } = render(<AppointmentDetailsScreen />);

    expect(getByText('Appointment Details')).toBeTruthy();

    expect(getByText('Doctor')).toBeTruthy();
    expect(getByText('Dr. Smith')).toBeTruthy();

    expect(getByText('Clinic')).toBeTruthy();
    expect(getByText('Primary Care')).toBeTruthy();

    expect(getByText('Date & Time')).toBeTruthy();
    expect(getByText('Feb 10, 2026 0900')).toBeTruthy();

    expect(getByText('Location')).toBeTruthy();
    expect(getByText('Fort Meade Clinic')).toBeTruthy();

    expect(getByText('Appointment Type')).toBeTruthy();
    expect(getByText('Follow-up')).toBeTruthy();
  });

  it('hides optional sections when values are empty and still allows back navigation', () => {
    useRoute.mockReturnValue({
      params: {
        id: 'a2',
        doctorName: '',
        clinicName: '',
        dateTime: '',
        location: '',
        appointmentType: '',
      },
    });

    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { AppointmentDetailsScreen } = require('@/screens/appointments/AppointmentDetailsScreen');

    const { getByText, queryByText, getByTestId } = render(<AppointmentDetailsScreen />);

    // Title should always show
    expect(getByText('Appointment Details')).toBeTruthy();

    // Optional labels should not render
    expect(queryByText('Doctor')).toBeNull();
    expect(queryByText('Clinic')).toBeNull();
    expect(queryByText('Date & Time')).toBeNull();
    expect(queryByText('Location')).toBeNull();
    expect(queryByText('Appointment Type')).toBeNull();

    // Back button: easiest is press the icon text (Ionicons mock renders "arrow-back")
    fireEvent.press(getByTestId('back-button'));
    expect(mockGoBack).toHaveBeenCalledTimes(1);
  });
});