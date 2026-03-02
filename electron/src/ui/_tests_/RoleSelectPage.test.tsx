// src/ui/_tests_/RoleSelectPage.test.tsx
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import RoleSelectPage from "../pages/RoleSelectPage";

// Mock navigate
const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe("RoleSelectPage", () => {
  beforeEach(() => {
    mockNavigate.mockClear();
    localStorage.clear();
  });

  test("renders page content", () => {
    render(<RoleSelectPage />);

    expect(
      screen.getByRole("heading", { name: /select your role/i })
    ).toBeInTheDocument();

    expect(screen.getByText(/patient/i)).toBeInTheDocument();
    expect(screen.getByText(/caregiver/i)).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: /continue to login/i })
    ).toBeInTheDocument();
  });

  test("defaults to patient selected", () => {
    render(<RoleSelectPage />);

    const patientBtn = screen.getByRole("button", { name: /patient/i });
    const caregiverBtn = screen.getByRole("button", { name: /caregiver/i });

    expect(patientBtn).toHaveAttribute("aria-pressed", "true");
    expect(caregiverBtn).toHaveAttribute("aria-pressed", "false");
  });

  test("allows selecting caregiver", () => {
    render(<RoleSelectPage />);

    const caregiverBtn = screen.getByRole("button", { name: /caregiver/i });

    fireEvent.click(caregiverBtn);

    expect(caregiverBtn).toHaveAttribute("aria-pressed", "true");
  });

  test("stores role and navigates to /login on continue", () => {
    render(<RoleSelectPage />);

    const caregiverBtn = screen.getByRole("button", { name: /caregiver/i });
    fireEvent.click(caregiverBtn);

    const continueBtn = screen.getByRole("button", {
      name: /continue to login/i,
    });

    fireEvent.click(continueBtn);

    expect(localStorage.getItem("cc_role")).toBe("caregiver");
    expect(mockNavigate).toHaveBeenCalledWith("/login");
  });

  test("back button navigates to landing", () => {
    render(<RoleSelectPage />);

    const backBtn = screen.getByRole("button", {
      name: /back to landing page/i,
    });

    fireEvent.click(backBtn);

    expect(mockNavigate).toHaveBeenCalledWith("/landing");
  });
});