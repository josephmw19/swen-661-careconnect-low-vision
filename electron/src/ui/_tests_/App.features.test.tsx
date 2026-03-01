import React from "react"; // Added missing React import
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import LoginPage from "../pages/LoginPage";

test("LoginPage handles button interactions", () => {
  const mockFn = jest.fn();
  render(
    <MemoryRouter>
      <LoginPage 
        onLogin={mockFn} 
        onGoCreate={mockFn} 
        onGoReset={mockFn} 
        onSOS={mockFn} 
      />
    </MemoryRouter>
  );

  // Mock the individual component files if they are separate files
jest.mock("../components/TodaysTasks", () => ({
  __esModule: true,
  default: () => <div data-testid="tasks-mock">Tasks</div>
}));
jest.mock("../components/NextMedication", () => ({
  __esModule: true,
  default: () => <div data-testid="meds-mock">Meds</div>
}));
jest.mock("../components/Alerts", () => ({
  __esModule: true,
  default: () => <div data-testid="alerts-mock">Alerts</div>
}));

// Mock the uiPieces file for CriticalMedicalInfo and HeaderRow
jest.mock("../components/uiPieces", () => ({
  __esModule: true,
  CriticalMedicalInfo: () => <div data-testid="critical-mock" />,
  HeaderRow: () => <div data-testid="header-mock" />,
  StatusItem: () => <div />,
  ActionButton: () => <button />
}));
  
  const backBtn = screen.getByRole("button", { name: /back/i });
  fireEvent.click(backBtn);
  
  // const loginBtn = screen.getByRole("button", { name: /log in/i });
  // fireEvent.click(loginBtn);

  const loginBtn = screen.getByRole("button", { name: /sign in/i });
  fireEvent.click(loginBtn);
});