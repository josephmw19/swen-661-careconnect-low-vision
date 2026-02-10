// src/__tests__/MedicationDetailsScreen.test.tsx
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';

// Mock AppHeader
jest.mock('@/components/AppHeader', () => ({
  AppHeader: () => null,
}));

// Make Ionicons render its name as text
jest.mock('@expo/vector-icons', () => {
  const React = require('react');
  const { Text } = require('react-native');
  return {
    Ionicons: (props: any) => <Text>{props.name}</Text>,
  };
});

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

describe('MedicationDetailsScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders required fields and optional sections when provided', () => {
    useRoute.mockReturnValue({
      params: {
        id: 'Ibuprofen',
        dosage: '200mg',
        instructions: 'Take with food',
        nextDose: 'Feb 10, 2026 0900',
        statusMessage: 'Refill soon',
      },
    });

    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { MedicationDetailsScreen } = require('@/screens/medications/MedicationDetailsScreen');

    const { getByText } = render(<MedicationDetailsScreen />);

    expect(getByText('Medication Details')).toBeTruthy();

    expect(getByText('Medication Name')).toBeTruthy();
    expect(getByText('Ibuprofen')).toBeTruthy();

    expect(getByText('Dosage')).toBeTruthy();
    expect(getByText('200mg')).toBeTruthy();

    expect(getByText('Instructions')).toBeTruthy();
    expect(getByText('Take with food')).toBeTruthy();

    expect(getByText('Next Dose')).toBeTruthy();
    expect(getByText('Feb 10, 2026 0900')).toBeTruthy();

    // statusMessage renders + icon text from mock
    expect(getByText('information-circle')).toBeTruthy();
    expect(getByText('Refill soon')).toBeTruthy();
  });

  it('hides optional sections when empty and still allows back navigation', () => {
    useRoute.mockReturnValue({
      params: {
        id: 'Ibuprofen',
        dosage: '200mg',
        instructions: '',
        nextDose: '',
        statusMessage: '',
      },
    });

    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { MedicationDetailsScreen } = require('@/screens/medications/MedicationDetailsScreen');

    const { getByText, queryByText, getByTestId } = render(<MedicationDetailsScreen />);

    expect(getByText('Medication Details')).toBeTruthy();

    // Required cards always present
    expect(getByText('Medication Name')).toBeTruthy();
    expect(getByText('Ibuprofen')).toBeTruthy();
    expect(getByText('Dosage')).toBeTruthy();
    expect(getByText('200mg')).toBeTruthy();

    // Optional sections hidden
    expect(queryByText('Instructions')).toBeNull();
    expect(queryByText('Next Dose')).toBeNull();
    expect(queryByText('information-circle')).toBeNull();

    fireEvent.press(getByTestId('back-button'));
    expect(mockGoBack).toHaveBeenCalledTimes(1);
  });
});