import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import LandingPage from "../pages/LandingPage";
import LoginPage from "../pages/LoginPage";
import CreateAccountPage from "../pages/CreateAccountPage";
import ResetPasswordPage from "../pages/ResetPasswordPage";
import RoleSelectPage from "../pages/RoleSelectPage";
import TasksPage from "../pages/TasksPage";
import AppointmentsPage from "../pages/AppointmentsPage";

jest.mock("../cc", () => ({
  cc: () => ({
    onNavigate: () => () => {},
    onCommand: () => () => {},
    showNativeDialog: jest.fn(),
  }),
}));

// Define common mock functions to satisfy component Props
const mockFn = jest.fn();

const wrap = (ui: React.ReactElement) => render(<MemoryRouter>{ui}</MemoryRouter>);

describe("Mass Page Rendering for Coverage", () => {
  test("renders all informational and auth pages", () => {
    wrap(<LandingPage />);
    // LoginPage requires: onLogin, onGoCreate, onGoReset, onSOS
    wrap(<LoginPage onLogin={mockFn} onGoCreate={mockFn} onGoReset={mockFn} onSOS={mockFn} />);
    // CreateAccountPage requires: onCreate, onBackToLogin, onSOS
    wrap(<CreateAccountPage onCreate={mockFn} onBackToLogin={mockFn} onSOS={mockFn} />);
    // ResetPasswordPage requires: onSend, onBack, onSOS
    wrap(<ResetPasswordPage onSend={mockFn} onBack={mockFn} onSOS={mockFn} />);
    wrap(<RoleSelectPage />);
    // TasksPage requires: onSOS
    wrap(<TasksPage onSOS={mockFn} />);
    // AppointmentsPage requires: onSOS
    wrap(<AppointmentsPage onSOS={mockFn} />);
  });
});