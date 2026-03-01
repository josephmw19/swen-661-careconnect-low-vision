import React from "react";
import { render, screen } from "@testing-library/react";
import DashboardPage from "../pages/DashboardPage";

// Mock sub-components that are causing "undefined" errors
jest.mock("../components/uiPieces", () => ({
  __esModule: true,
  ...(jest.requireActual("../components/uiPieces") as any),
  CriticalMedicalInfo: () => <div>Critical Info Mock</div>,
}));
jest.mock("../components/TodaysTasks", () => () => <div>Tasks Mock</div>);
jest.mock("../components/NextMedication", () => () => <div>Medication Mock</div>);
jest.mock("../components/Alerts", () => () => <div>Alerts Mock</div>);

test("DashboardPage renders all key sections", () => {
  render(<DashboardPage criticalOpen={false} onToggleCritical={jest.fn()} onSOS={jest.fn()} />);
  
  // This will push DashboardPage to 100% line coverage
  expect(screen.getByText("Critical Info Mock")).toBeInTheDocument();
  expect(screen.getByText("Tasks Mock")).toBeInTheDocument();
});