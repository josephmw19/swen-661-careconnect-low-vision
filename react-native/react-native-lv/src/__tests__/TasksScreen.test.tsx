// src/__tests__/TasksScreen.test.tsx
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';

// Mock AppHeader so we don’t pull providers/deps
jest.mock('@/components/AppHeader', () => ({
  AppHeader: () => null,
}));

/**
 * Mock TaskListItem so we can:
 * - See what props TasksScreen is passing
 * - Trigger onMarkComplete deterministically
 * This still covers TasksScreen logic and branches (handleMarkComplete + getCompletionTime).
 */
jest.mock('@/components/tasks/TaskListItem', () => {
  const React = require('react');
  const { View, Text, Pressable } = require('react-native');

  const TaskStatus = {
    completed: 'completed',
    notCompleted: 'notCompleted',
    upcoming: 'upcoming',
  };

  const TaskListItem = (props: any) => {
    const {
      title,
      description,
      statusText,
      completionText,
      dueDate,
      hasActionButton,
      onMarkComplete,
    } = props;

    return (
      <View>
        <Text>{title}</Text>
        {description ? <Text>{description}</Text> : null}
        {statusText ? <Text>{statusText}</Text> : null}
        {completionText ? <Text>{completionText}</Text> : null}
        {dueDate ? <Text>{dueDate}</Text> : null}

        {hasActionButton ? (
          <Pressable
            accessibilityRole="button"
            testID={`mark-${title}`}
            onPress={() => onMarkComplete?.()}
          >
            <Text>Mark Complete</Text>
          </Pressable>
        ) : null}
      </View>
    );
  };

  return { TaskListItem, TaskStatus };
});

describe('TasksScreen', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    // Fixed local time so getCompletionTime() is deterministic
    jest.setSystemTime(new Date('2026-02-10T15:07:00')); // 3:07 PM
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.clearAllMocks();
  });

  it('renders sections and initial task states', () => {
    const { TasksScreen } = require('@/screens/tasks/TasksScreen');

    const { getByText, getAllByText } = render(<TasksScreen />);

    // Section headers
    expect(getByText('Tasks')).toBeTruthy();
    expect(getByText('Today')).toBeTruthy();
    expect(getByText('Upcoming')).toBeTruthy();
    expect(getByText('Completed')).toBeTruthy();

    // Not completed tasks show status text initially (two tasks share same status line)
    expect(getByText('Take morning vitamins')).toBeTruthy();
    expect(getByText('Drink 8 glasses of water')).toBeTruthy();
    expect(getAllByText('Status: Not completed')).toHaveLength(2);

    expect(getByText('Stay hydrated throughout the day')).toBeTruthy();

    // Completed tasks show their completion text
    expect(getByText('Check blood pressure')).toBeTruthy();
    expect(getByText('Completed at 7:45 AM')).toBeTruthy();

    // Upcoming tasks show due dates
    expect(getByText('Call pharmacy for refill')).toBeTruthy();
    expect(getByText('Due February 2, 2026')).toBeTruthy();
  });

  it('marks dynamic tasks complete and shows computed completion time', () => {
    const { TasksScreen } = require('@/screens/tasks/TasksScreen');
    const { getByTestId, queryByText, getAllByText } = render(<TasksScreen />);

    // Vitamins: press mark complete
    fireEvent.press(getByTestId('mark-Take morning vitamins'));

    // Status text still exists because water is still not completed
    expect(queryByText('Status: Not completed')).toBeTruthy();

    // Now exactly one computed completion time exists
    expect(getAllByText('Completed at 3:07 PM')).toHaveLength(1);

    // Water: press mark complete
    fireEvent.press(getByTestId('mark-Drink 8 glasses of water'));

    // Now both dynamic tasks completed, so status line should be gone entirely
    expect(queryByText('Status: Not completed')).toBeNull();

    // Two tasks now show the same computed completion time
    expect(getAllByText('Completed at 3:07 PM')).toHaveLength(2);
  });
});