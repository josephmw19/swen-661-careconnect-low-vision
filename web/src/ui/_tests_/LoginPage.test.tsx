// src/ui/_tests_/LoginPage.test.tsx
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import LoginPage from "../pages/LoginPage";

// Mock navigate
const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe("LoginPage", () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  function renderPage(overrides?: Partial<React.ComponentProps<typeof LoginPage>>) {
    const props: React.ComponentProps<typeof LoginPage> = {
      onLogin: jest.fn(),
      onGoCreate: jest.fn(),
      onGoReset: jest.fn(),
      onSOS: jest.fn(),
      ...overrides,
    };

    render(<LoginPage {...props} />);
    return props;
  }

  test("renders and shows default email", () => {
    renderPage();

    expect(screen.getByLabelText(/sign in page/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/careconnect brand/i)).toBeInTheDocument();
    expect(
      screen.getByRole("region", { name: /welcome back sign in form/i })
    ).toBeInTheDocument();

    const email = screen.getByLabelText(/email address/i) as HTMLInputElement;
    expect(email.value).toBe("jane.smith@example.com");

    expect(screen.getByRole("button", { name: /sign in/i })).toBeInTheDocument();
  });

  test("autofocuses the email input on mount", () => {
    renderPage();

    const email = screen.getByLabelText(/email address/i) as HTMLInputElement;
    // React will focus it in useEffect
    expect(document.activeElement).toBe(email);
  });

  test("sign in is disabled until password is entered, then calls onLogin on submit", () => {
    const props = renderPage();
    const signInBtn = screen.getByRole("button", { name: /sign in/i });

    // Initially disabled because password is empty
    expect(signInBtn).toBeDisabled();

    const password = screen.getByLabelText(/^password$/i) as HTMLInputElement;
    fireEvent.change(password, { target: { value: "Password123!" } });

    expect(signInBtn).not.toBeDisabled();

    fireEvent.click(signInBtn);
    expect(props.onLogin).toHaveBeenCalledTimes(1);
  });

  test("does not call onLogin when form is invalid", () => {
    const props = renderPage();

    // Leave password empty, try submit
    const form = screen.getByRole("region", { name: /welcome back sign in form/i })
      .querySelector("form") as HTMLFormElement;

    fireEvent.submit(form);
    expect(props.onLogin).toHaveBeenCalledTimes(0);
  });

  test("toggle show/hide password updates input type and aria-pressed", () => {
    renderPage();

    const password = screen.getByLabelText(/^password$/i) as HTMLInputElement;
    expect(password.type).toBe("password");

    const toggle = screen.getByRole("button", { name: /show password/i });
    expect(toggle).toHaveAttribute("aria-pressed", "false");

    fireEvent.click(toggle);

    // Button label flips to "Hide password"
    const hideBtn = screen.getByRole("button", { name: /hide password/i });
    expect(hideBtn).toHaveAttribute("aria-pressed", "true");
    expect((screen.getByLabelText(/^password$/i) as HTMLInputElement).type).toBe("text");
  });

  test("back button navigates to /role", () => {
    renderPage();

    const backBtn = screen.getByRole("button", { name: /back to role selection/i });
    fireEvent.click(backBtn);

    expect(mockNavigate).toHaveBeenCalledWith("/role");
  });

  test("forgot password and create account buttons call handlers", () => {
    const props = renderPage();

    fireEvent.click(screen.getByRole("button", { name: /forgot password\?/i }));
    expect(props.onGoReset).toHaveBeenCalledTimes(1);

    fireEvent.click(screen.getByRole("button", { name: /create an account/i }));
    expect(props.onGoCreate).toHaveBeenCalledTimes(1);
  });
});