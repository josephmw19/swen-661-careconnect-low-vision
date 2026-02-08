import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import { App } from '../App';

describe('App', () => {
  it('renders without crashing', async () => {
    render(<App />);

    // Wait a tick for providers' async useEffects to finish
    await waitFor(() => {
      // If we got here, React had time to flush state updates.
      // We don't need to assert anything fancy yet.
      expect(true).toBe(true);
    });
  });
});