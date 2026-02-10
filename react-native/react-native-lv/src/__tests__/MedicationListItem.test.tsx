import React from 'react';
import { render } from '@testing-library/react-native';
import { MedicationListItem, MedicationStatus } from '@/components/medications/MedicationListItem';

describe('MedicationListItem', () => {
  it('renders medication name and instructions', () => {
    const { getByText } = render(
      <MedicationListItem
        name="Ibuprofen"
        instructions="200mg"
        status={MedicationStatus.scheduled}
        statusText="Daily"
      />
    );

    expect(getByText('Ibuprofen')).toBeTruthy();
    expect(getByText('200mg')).toBeTruthy();
    expect(getByText('Daily')).toBeTruthy();
  });
});