import React from 'react';
import { render } from '@testing-library/react-native';
import { AppointmentCard } from '@/components/appointments/AppointmentCard';

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({ navigate: jest.fn() }),
}));

describe('AppointmentCard', () => {
  it('renders doctor name and date', () => {
    const { getByText } = render(
      <AppointmentCard
        doctorName="Dr. Smith"
        dateTime="Feb 10, 3:45 PM"
        location="Vision Care Center"
        appointmentType="Follow-up"
      />
    );

    expect(getByText('Dr. Smith')).toBeTruthy();
    expect(getByText('Feb 10, 3:45 PM')).toBeTruthy();
  });
});