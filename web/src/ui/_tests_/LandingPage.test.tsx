// src/ui/_tests_/LandingPage.test.tsx
import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import LandingPage from "../pages/LandingPage";

// Mock react-router-dom's useNavigate
const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  // keep anything else if needed later
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe("LandingPage", () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  test("renders key landing content", () => {
    render(<LandingPage />);

    // Brand + hero heading
    expect(screen.getByText("CareConnect")).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      /Healthcare Support/i
    );
    expect(screen.getByText(/Designed for Clarity/i)).toBeInTheDocument();

    // Features section title
    expect(
      screen.getByRole("heading", { level: 2, name: /Everything You Need/i })
    ).toBeInTheDocument();

    // WCAG badge
    expect(screen.getByText(/WCAG 2\.1 AA Compliant/i)).toBeInTheDocument();

    // Footer year
    expect(screen.getByText(/© 2026 CareConnect/i)).toBeInTheDocument();
  });

  test("navigates to /role from Sign In and Get Started", () => {
    render(<LandingPage />);

    const signInBtn = screen.getByRole("button", { name: "Sign In" });
    fireEvent.click(signInBtn);
    expect(mockNavigate).toHaveBeenCalledWith("/role");

    const getStartedBtn = screen.getByRole("button", { name: "Get Started" });
    fireEvent.click(getStartedBtn);
    expect(mockNavigate).toHaveBeenCalledWith("/role");

    expect(mockNavigate).toHaveBeenCalledTimes(2);
  });

  test("renders feature cards", () => {
    render(<LandingPage />);

    expect(screen.getByRole("heading", { level: 3, name: "Medication Reminders" })).toBeInTheDocument();
    expect(screen.getByText(/Never miss a dose/i)).toBeInTheDocument();

    expect(screen.getByRole("heading", { level: 3, name: "Offline Access" })).toBeInTheDocument();
    expect(screen.getByText(/even offline/i)).toBeInTheDocument();
  });
});