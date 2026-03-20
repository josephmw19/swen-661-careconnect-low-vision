// src/ui/_tests_/AppointmentDetailsPage.test.tsx
import React from "react";
import { render, screen, within } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import AppointmentDetailsPage from "../pages/AppointmentDetailsPage";

// Mock HeaderRow only
jest.mock("../components/uiPieces", () => ({
  HeaderRow: ({ title, onSOS }: { title: string; onSOS: () => void }) => (
    <div>
      <h1>{title}</h1>
      <button type="button" onClick={onSOS}>
        SOS
      </button>
    </div>
  ),
}));

// Mock useNavigate so we can assert navigation calls.
const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => {
  const actual = jest.requireActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

function renderPage(path = "/appointments/a99") {
  const onSOS = jest.fn();

  render(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route
          path="/appointments/:appointmentId"
          element={<AppointmentDetailsPage onSOS={onSOS} />}
        />
      </Routes>
    </MemoryRouter>
  );

  return { onSOS };
}

describe("AppointmentDetailsPage", () => {
  beforeEach(() => {
    mockNavigate.mockReset();
  });

  test("renders header, back button, and main sections", () => {
    renderPage("/appointments/a1");

    // Header from mocked HeaderRow
    expect(
      screen.getByRole("heading", { level: 1, name: /appointment details/i })
    ).toBeInTheDocument();

    // Back control
    expect(
      screen.getByRole("button", { name: /back to appointments/i })
    ).toBeInTheDocument();

    // Subtitle
    expect(
      screen.getByText(/review appointment information and actions/i)
    ).toBeInTheDocument();

    // Content container
    expect(
      screen.getByLabelText(/appointment details content/i)
    ).toBeInTheDocument();

    // Section cards by aria-label
    expect(screen.getByLabelText(/appointment summary/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^location$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/preparation notes/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^actions$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/appointment history/i)).toBeInTheDocument();
  });

  test("shows summary details (provider, specialty, reason, date)", () => {
    renderPage("/appointments/a1");

    const summary = screen.getByLabelText(/appointment summary/i);
    expect(within(summary).getByText(/dr\. sarah jefferson/i)).toBeInTheDocument();
    expect(within(summary).getByText(/primary care/i)).toBeInTheDocument();
    expect(within(summary).getByText(/annual checkup/i)).toBeInTheDocument();
    expect(within(summary).getByText(/monday,\s*february 3/i)).toBeInTheDocument();
  });

  test("shows location details", () => {
    renderPage("/appointments/a1");

    const loc = screen.getByLabelText(/^location$/i);
    expect(within(loc).getByText(/main street medical center/i)).toBeInTheDocument();
    expect(within(loc).getByText(/123 main street/i)).toBeInTheDocument();
    expect(within(loc).getByText(/springfield,\s*va/i)).toBeInTheDocument();
    expect(within(loc).getByText(/arrive 15 minutes early/i)).toBeInTheDocument();
  });

  test("renders the preparation list items", () => {
    renderPage("/appointments/a1");

    const prepList = screen.getByRole("list", { name: /preparation list/i });
    const items = within(prepList).getAllByRole("listitem");
    expect(items.length).toBe(4);

    expect(within(prepList).getByText(/bring insurance card/i)).toBeInTheDocument();
    expect(within(prepList).getByText(/bring list of current medications/i)).toBeInTheDocument();
  });

  test("renders action buttons (wired as no-ops) with accessible names", () => {
    renderPage("/appointments/a1");

    expect(screen.getByRole("button", { name: /add to calendar/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /call office/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /set coverage/i })).toBeInTheDocument();
  });

  test("renders appointment history rows", () => {
    renderPage("/appointments/a1");

    const history = screen.getByLabelText(/appointment history/i);
    expect(within(history).getByText(/scheduled on/i)).toBeInTheDocument();
    expect(within(history).getByText(/jan 19,\s*2026/i)).toBeInTheDocument();

    expect(within(history).getByText(/last visit/i)).toBeInTheDocument();
    expect(within(history).getByText(/feb 10,\s*2025/i)).toBeInTheDocument();

    expect(within(history).getByText(/notified and confirmed/i)).toBeInTheDocument();
    expect(within(history).getByText(/jan 28,\s*2026/i)).toBeInTheDocument();
  });

  test("back button navigates to /appointments", () => {
    renderPage("/appointments/a1");

    screen.getByRole("button", { name: /back to appointments/i }).click();
    expect(mockNavigate).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledWith("/appointments");
  });

  test("clicking SOS calls onSOS", () => {
    const { onSOS } = renderPage("/appointments/a1");

    screen.getByRole("button", { name: /sos/i }).click();
    expect(onSOS).toHaveBeenCalledTimes(1);
  });

  test("uses appointmentId param when present (smoke check via route)", () => {
    // We don’t display ID directly, but this ensures route param parsing doesn’t crash.
    renderPage("/appointments/a99");
    expect(
      screen.getByRole("heading", { name: /appointment details/i })
    ).toBeInTheDocument();
  });
});