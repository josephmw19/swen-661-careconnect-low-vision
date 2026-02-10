import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';

// Mock AppHeader so we don’t pull in provider dependencies
jest.mock('@/components/AppHeader', () => ({
  AppHeader: () => null,
}));

// Optional, but keeps icon rendering harmless in tests
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

describe('TaskDetailsScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders required field and optional sections when provided', () => {
    useRoute.mockReturnValue({
      params: {
        id: 'Call VA clinic',
        description: 'Ask about CPAP supplies',
        dueTime: 'Feb 10, 2026 1300',
        statusMessage: 'Due soon',
      },
    });

    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { TaskDetailsScreen } = require('@/screens/tasks/TaskDetailsScreen');

    const { getByText } = render(<TaskDetailsScreen />);

    expect(getByText('Task Details')).toBeTruthy();

    expect(getByText('Task Title')).toBeTruthy();
    expect(getByText('Call VA clinic')).toBeTruthy();

    expect(getByText('Description')).toBeTruthy();
    expect(getByText('Ask about CPAP supplies')).toBeTruthy();

    expect(getByText('Due Time')).toBeTruthy();
    expect(getByText('Feb 10, 2026 1300')).toBeTruthy();

    expect(getByText('Due soon')).toBeTruthy();
  });

  it('hides optional sections when empty and still allows back navigation', () => {
    useRoute.mockReturnValue({
      params: {
        id: 'Pay rent',
        description: '',
        dueTime: '',
        statusMessage: '',
      },
    });

    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { TaskDetailsScreen } = require('@/screens/tasks/TaskDetailsScreen');

    const { getByText, queryByText, getByTestId } = render(<TaskDetailsScreen />);

    expect(getByText('Task Details')).toBeTruthy();

    // Required section always shows
    expect(getByText('Task Title')).toBeTruthy();
    expect(getByText('Pay rent')).toBeTruthy();

    // Optional sections hidden
    expect(queryByText('Description')).toBeNull();
    expect(queryByText('Due Time')).toBeNull();
    expect(queryByText('Due soon')).toBeNull();

    fireEvent.press(getByTestId('back-button'));
    expect(mockGoBack).toHaveBeenCalledTimes(1);
  });
});