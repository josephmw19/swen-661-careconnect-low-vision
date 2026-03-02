import React from "react";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import CreateAccountPage from "../pages/CreateAccountPage";

// mock navigate so we can test fallback path
const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => {
  const actual = jest.requireActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

function renderPage(overrides?: Partial<React.ComponentProps<typeof CreateAccountPage>>) {
  const props = {
    onCreate: jest.fn(),
    onBackToLogin: jest.fn(),
    onSOS: jest.fn(),
    ...overrides,
  };

  render(
    <MemoryRouter>
      <CreateAccountPage {...props} />
    </MemoryRouter>
  );

  return props;
}

async function clearAndType(el: HTMLElement, value: string) {
  const user = userEvent.setup();
  await user.clear(el as HTMLInputElement);
  await user.type(el as HTMLInputElement, value);
}

describe("CreateAccountPage", () => {
  beforeEach(() => {
    mockNavigate.mockReset();
    jest.restoreAllMocks();
  });

  test("renders key sections and focuses Full Name on mount", () => {
    renderPage();

    expect(screen.getByLabelText(/create account page/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/careconnect brand/i)).toBeInTheDocument();
    expect(screen.getByRole("region", { name: /create account form/i })).toBeInTheDocument();

    const name = screen.getByLabelText(/^full name$/i);
    expect(name).toHaveFocus();

    // Submit starts disabled because password/confirm/agree not satisfied
    const submit = screen.getByRole("button", { name: /create account/i });
    expect(submit).toBeDisabled();
    expect(submit).toHaveAttribute("aria-disabled", "true");
  });

  test("password requirement items flip their aria-labels when rules are met", async () => {
    const user = userEvent.setup();
    renderPage();

    const pass = screen.getByLabelText(/^password$/i);

    const reqGroup = screen.getByRole("group", { name: /password requirements/i });
    const items = within(reqGroup).getAllByRole("listitem");

    // initial: not met for all
    expect(items[0]).toHaveAttribute("aria-label", expect.stringMatching(/at least 8 characters, not met/i));
    expect(items[1]).toHaveAttribute("aria-label", expect.stringMatching(/one uppercase letter, not met/i));
    expect(items[2]).toHaveAttribute("aria-label", expect.stringMatching(/one lowercase letter, not met/i));
    expect(items[3]).toHaveAttribute("aria-label", expect.stringMatching(/one number, not met/i));

    await user.type(pass, "Abcdefg1"); // 8+, upper, lower, number

    expect(items[0]).toHaveAttribute("aria-label", expect.stringMatching(/at least 8 characters, met/i));
    expect(items[1]).toHaveAttribute("aria-label", expect.stringMatching(/one uppercase letter, met/i));
    expect(items[2]).toHaveAttribute("aria-label", expect.stringMatching(/one lowercase letter, met/i));
    expect(items[3]).toHaveAttribute("aria-label", expect.stringMatching(/one number, met/i));
  });

  test("show/hide password toggles input type and aria-pressed", async () => {
    const user = userEvent.setup();
    renderPage();

    const pass = screen.getByLabelText(/^password$/i) as HTMLInputElement;

    // default hidden
    expect(pass.type).toBe("password");

    const toggle = screen.getByRole("button", { name: /show password/i });
    expect(toggle).toHaveAttribute("aria-pressed", "false");

    await user.click(toggle);
    expect(pass.type).toBe("text");
    expect(screen.getByRole("button", { name: /hide password/i })).toHaveAttribute("aria-pressed", "true");

    await user.click(screen.getByRole("button", { name: /hide password/i }));
    expect(pass.type).toBe("password");
    expect(screen.getByRole("button", { name: /show password/i })).toHaveAttribute("aria-pressed", "false");
  });

  test("confirm password mismatch shows message and aria-invalid true", async () => {
    const user = userEvent.setup();
    renderPage();

    const pass = screen.getByLabelText(/^password$/i);
    const confirm = screen.getByLabelText(/^confirm password$/i);

    await user.type(pass, "Abcdefg1");
    await user.type(confirm, "Abcdefg2");

    expect(confirm).toHaveAttribute("aria-invalid", "true");
    expect(screen.getByText(/passwords do not match/i)).toBeInTheDocument();
  });

  test("when all criteria are met, Create Account enables and submit calls onCreate", async () => {
    const user = userEvent.setup();
    const props = renderPage();

    // defaults: name and email are already valid from initial state
    const pass = screen.getByLabelText(/^password$/i);
    const confirm = screen.getByLabelText(/^confirm password$/i);
    const agree = screen.getByRole("checkbox", { name: /agree to the terms of service/i });

    await user.type(pass, "Abcdefg1");
    await user.type(confirm, "Abcdefg1");
    await user.click(agree);

    const submit = screen.getByRole("button", { name: /create account/i });
    expect(submit).toBeEnabled();
    expect(submit).toHaveAttribute("aria-disabled", "false");

    await user.click(submit);
    expect(props.onCreate).toHaveBeenCalledTimes(1);
  });

  test("submit does NOT call onCreate when criteria are not met", async () => {
    const user = userEvent.setup();
    const props = renderPage();

    const submit = screen.getByRole("button", { name: /create account/i });
    expect(submit).toBeDisabled();

    // even if clicked (some browsers won’t fire), ensure handler not called
    await user.click(submit);
    expect(props.onCreate).toHaveBeenCalledTimes(0);
  });

  test("back button prefers props.onBackToLogin", async () => {
    const user = userEvent.setup();
    const props = renderPage();

    await user.click(screen.getByRole("button", { name: /go back to login/i }));
    expect(props.onBackToLogin).toHaveBeenCalledTimes(1);
    expect(mockNavigate).not.toHaveBeenCalled();
  });

  test("back button falls back to navigate('/login') if onBackToLogin throws", async () => {
    const user = userEvent.setup();
    renderPage({
      onBackToLogin: () => {
        throw new Error("boom");
      },
    });

    await user.click(screen.getByRole("button", { name: /go back to login/i }));
    expect(mockNavigate).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledWith("/login");
  });

  test("Sign in button calls onBackToLogin", async () => {
    const user = userEvent.setup();
    const props = renderPage();

    await user.click(screen.getByRole("button", { name: /sign in/i }));
    expect(props.onBackToLogin).toHaveBeenCalledTimes(1);
  });

  test("changing name/email can disable create again if invalid", async () => {
    const user = userEvent.setup();
    renderPage();

    const pass = screen.getByLabelText(/^password$/i);
    const confirm = screen.getByLabelText(/^confirm password$/i);
    const agree = screen.getByRole("checkbox", { name: /agree to the terms of service/i });

    await user.type(pass, "Abcdefg1");
    await user.type(confirm, "Abcdefg1");
    await user.click(agree);

    const submit = screen.getByRole("button", { name: /create account/i });
    expect(submit).toBeEnabled();

    // Make email invalid (no @)
    const email = screen.getByLabelText(/^email address$/i);
    await user.clear(email);
    await user.type(email, "invalid.email");

    expect(submit).toBeDisabled();
    expect(submit).toHaveAttribute("aria-disabled", "true");
  });
});