import React from "react";
import { render, screen, act } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "../App";

let navCallback: (p: string) => void;

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

jest.mock("../cc", () => ({
  cc: () => ({
    onNavigate: (cb: any) => { navCallback = cb; return () => {}; },
    onCommand: () => () => {},
    showNativeDialog: jest.fn(),
  }),
}));

test("triggers state updates from native commands", async () => {
  render(<MemoryRouter><App /></MemoryRouter>);
  
  // This executes the routing logic in lines 69-97
  await act(async () => {
    navCallback("/settings");
  });

  // Verification hits the branch logic in lines 158-208
  expect(await screen.findByRole("heading", { name: /settings/i })).toBeInTheDocument();
});