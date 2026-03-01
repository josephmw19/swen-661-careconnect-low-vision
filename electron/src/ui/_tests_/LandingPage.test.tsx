import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import LandingPage from "../pages/LandingPage";

// Mock the Electron bridge to prevent CC undefined errors
jest.mock("../cc", () => ({
  cc: () => ({
    onNavigate: () => () => {},
    onCommand: () => () => {},
    showNativeDialog: jest.fn(),
  }),
}));

describe("LandingPage", () => {
  const renderLandingPage = () => {
    return render(
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/role-select" element={<div data-testid="role-select-page" />} />
          <Route path="/login" element={<div data-testid="login-page" />} />
        </Routes>
      </MemoryRouter>
    );
  };

  test("renders branding and main heading", () => {
    renderLandingPage();
    expect(screen.getByText(/CareConnect/i)).toBeInTheDocument();
    expect(screen.getByText(/Simplified Care for/i)).toBeInTheDocument();
  });

  test("navigates to role selection when clicking Get Started", () => {
    renderLandingPage();
    // Use the accessible name 'Get Started' to hit the primary action branch
    const getStartedBtn = screen.getByRole("button", { name: /get started/i });
    fireEvent.click(getStartedBtn);
    
    // Verify navigation occurred (this covers the useNavigate() call)
    expect(screen.getByTestId("role-select-page")).toBeInTheDocument();
  });

  test("navigates to login when clicking Sign In", () => {
    renderLandingPage();
    /** * FIX: Based on your error logs, the button is named "Sign In", 
     * not "Log In".
     */
    const signInBtn = screen.getByRole("button", { name: /sign in/i });
    fireEvent.click(signInBtn);
    
    // Verify navigation occurred to the login route
    expect(screen.getByTestId("login-page")).toBeInTheDocument();
  });
});