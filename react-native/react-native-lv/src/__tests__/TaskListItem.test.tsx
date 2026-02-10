import React from 'react';
import { render } from '@testing-library/react-native';
import { TaskListItem, TaskStatus } from '@/components/tasks/TaskListItem';

describe('TaskListItem', () => {
  it('renders task title and due text', () => {
    const { getByText } = render(
      <TaskListItem
        title="Refill prescription"
        status={TaskStatus.upcoming}
        dueDate="Tomorrow"
      />
    );

    expect(getByText('Refill prescription')).toBeTruthy();
    expect(getByText('Tomorrow')).toBeTruthy();
  });
});