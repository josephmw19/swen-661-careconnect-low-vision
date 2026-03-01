import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "../App";

/**
 * We REMOVED the SettingsPage mock here.
 * Now, when the test navigates to /settings, it loads the real SettingsPage.tsx,
 * covering 341 lines of code in the process.
 */

beforeAll(() => {
  // jsdom doesn't implement scrollTo on elements
  (Element.prototype as any).scrollTo = jest.fn();
  (window as any).scrollTo = jest.fn();
});

// We only mock DashboardPage to keep the focus on the navigation target
jest.mock("../pages/DashboardPage", () => ({
  __esModule: true,
  default: () => <div>Dashboard</div>,
}));

jest.mock("../cc", () => ({
  cc: () => ({
    onNavigate: (cb: (p: string) => void) => {
      // This simulates the Electron IPC message "cc:navigate"
      cb("/settings"); 
      return () => {};
    },
    onCommand: () => () => {},
    showNativeDialog: jest.fn(),
  }),
}));

test("navigates to the REAL SettingsPage when main process sends cc:navigate", async () => {
  render(
    <MemoryRouter initialEntries={["/"]}>
      <App />
    </MemoryRouter>
  );

  // This now searches the real SettingsPage component for its <h1> header
  // Finding this proves the navigation worked and executes the SettingsPage code.
  expect(await screen.findByRole("heading", { name: /settings/i })).toBeInTheDocument();
  
  // Verify a piece of the real SettingsPage is visible (e.g., a card title)
  expect(screen.getByText(/Vision & Display/i)).toBeInTheDocument();
});