import React from 'react';
import { renderWithProviders } from '@/testUtils/testUtils';
import { HomeScreen } from '@/screens/home/HomeScreen';

describe('HomeScreen', () => {
  it('renders key home content', () => {
    const { getByText } = renderWithProviders(<HomeScreen />);
    expect(getByText('CareConnect')).toBeTruthy();
    expect(getByText('Upcoming Appointments')).toBeTruthy();
    expect(getByText('View All Appointments')).toBeTruthy();
  });
});