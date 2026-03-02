// src/ui/_tests_/ResetPasswordPage.test.tsx
import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import ResetPasswordPage from "../pages/ResetPasswordPage";

// Mock react-router navigate so tests don't crash on useNavigate()
const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => {
  const actual = jest.requireActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

function renderPage(overrides?: Partial<React.ComponentProps<typeof ResetPasswordPage>>) {
  const onSend = jest.fn();
  const onBack = jest.fn();
  const onSOS = jest.fn();

  render(
    <ResetPasswordPage
      onSend={onSend}
      onBack={onBack}
      onSOS={onSOS}
      {...overrides}
    />
  );

  return { onSend, onBack, onSOS };
}

describe("ResetPasswordPage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("send button disabled until email looks valid, then calls onSend on submit", () => {
    const { onSend } = renderPage();

    const sendBtn = screen.getByRole("button", { name: /send reset link/i });
    const email = screen.getByLabelText(/^email address$/i) as HTMLInputElement;

    // Page defaults to a valid email, so it's enabled initially
    expect(sendBtn).toHaveAttribute("aria-disabled", "false");

    // Make invalid
    fireEvent.change(email, { target: { value: "" } });
    expect(sendBtn).toHaveAttribute("aria-disabled", "true");

    // Still invalid (no @)
    fireEvent.change(email, { target: { value: "notanemail" } });
    expect(sendBtn).toHaveAttribute("aria-disabled", "true");

    // Now valid
    fireEvent.change(email, { target: { value: "user@example.com" } });
    expect(sendBtn).toHaveAttribute("aria-disabled", "false");

    // Submit should call onSend
    fireEvent.click(sendBtn);
    expect(onSend).toHaveBeenCalledTimes(1);
  });

  test("back button calls onBack", () => {
    const { onBack } = renderPage();

    const backBtn = screen.getByRole("button", { name: /go back to login/i });
    fireEvent.click(backBtn);

    expect(onBack).toHaveBeenCalledTimes(1);
    expect(mockNavigate).not.toHaveBeenCalled();
  });

  test("enter key submits when enabled", () => {
    const { onSend } = renderPage();

    const email = screen.getByLabelText(/^email address$/i) as HTMLInputElement;
    const sendBtn = screen.getByRole("button", { name: /send reset link/i });

    // Ensure valid email
    fireEvent.change(email, { target: { value: "user@example.com" } });
    expect(sendBtn).toHaveAttribute("aria-disabled", "false");

    // Submit via form submit event
    fireEvent.submit(sendBtn.closest("form")!);
    expect(onSend).toHaveBeenCalledTimes(1);
  });
});