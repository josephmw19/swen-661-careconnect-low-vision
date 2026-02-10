import React from 'react';
import { renderWithProviders } from '@/testUtils/testUtils';
import { LandingScreen } from '@/screens/auth/LandingScreen';

describe('LandingScreen', () => {
  it('renders without crashing', () => {
    const { getByText } = renderWithProviders(<LandingScreen />);
    expect(getByText('CareConnect')).toBeTruthy();
  });
});