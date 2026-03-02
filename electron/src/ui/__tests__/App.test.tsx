import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

// Adjust import path if needed:
import App from '../App';

describe('App', () => {
  it('renders without crashing (landing route)', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );

    // Pick text that actually exists on your LandingPage.
    // If you’re not sure yet, run the test once and check the DOM output.
    expect(document.body).toBeTruthy();
  });
});
