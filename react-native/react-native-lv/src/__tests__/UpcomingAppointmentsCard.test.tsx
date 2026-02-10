import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { UpcomingAppointmentsCard } from '@/components/home/UpcomingAppointmentsCard';

const mockNavigate = jest.fn();

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: mockNavigate,
  }),
}));

describe('UpcomingAppointmentsCard', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  it('navigates to Appointments when View All Appointments is pressed', () => {
    const { getByTestId } = render(<UpcomingAppointmentsCard />);

    fireEvent.press(getByTestId('viewAllAppointmentsButton'));

    expect(mockNavigate).toHaveBeenCalledWith('Appointments');
  });
});