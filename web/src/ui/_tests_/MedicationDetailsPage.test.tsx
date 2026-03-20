// src/ui/_tests_/MedicationDetailsPage.test.tsx
import React from "react";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import MedicationDetailsPage from "../pages/MedicationDetailsPage";

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

// Mock navigation
const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => {
  const actual = jest.requireActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

function renderPage(path = "/medications/m1") {
  const onSOS = jest.fn();
  render(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route path="/medications/:medId" element={<MedicationDetailsPage onSOS={onSOS} />} />
      </Routes>
    </MemoryRouter>
  );
  return { onSOS };
}

describe("MedicationDetailsPage", () => {
  beforeEach(() => {
    mockNavigate.mockReset();
    jest.restoreAllMocks();
  });

  test("renders header, back button, and key sections", () => {
    renderPage("/medications/m1");

    expect(screen.getByRole("heading", { level: 1, name: /medication details/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /back to medications/i })).toBeInTheDocument();

    // target the sections by their aria-labels (unambiguous)
    expect(screen.getByLabelText(/medication summary/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^instructions$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^history$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^actions$/i)).toBeInTheDocument();
  });

  test("uses medId from route param in subtitle", () => {
    renderPage("/medications/Atorvastatin-10mg");
    expect(screen.getByText(/medication\s*•/i)).toBeInTheDocument();
    expect(screen.getByText(/Atorvastatin-10mg/i)).toBeInTheDocument();
  });

  test("back button navigates to /medications", async () => {
    const user = userEvent.setup();
    renderPage("/medications/m1");

    await user.click(screen.getByRole("button", { name: /back to medications/i }));
    expect(mockNavigate).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledWith("/medications");
  });

  test("renders instructions list items", () => {
    renderPage("/medications/m1");

    const list = screen.getByRole("list", { name: /medication instructions list/i });
    const items = within(list).getAllByRole("listitem");
    expect(items.length).toBeGreaterThanOrEqual(4);

    expect(within(list).getByText(/take with food and water/i)).toBeInTheDocument();
    expect(within(list).getByText(/do not skip doses/i)).toBeInTheDocument();
  });

  test("renders medication history list with 5 items", () => {
    renderPage("/medications/m1");

    const historyList = screen.getByRole("list", { name: /medication history list/i });
    const rows = within(historyList).getAllByRole("listitem");
    expect(rows.length).toBe(5);

    expect(within(historyList).getByText(/taken today at 8:15 am/i)).toBeInTheDocument();
    expect(within(historyList).getByText(/missed dose on jan 27/i)).toBeInTheDocument();
  });

  test("Mark as Taken disables button, updates label, and alerts", async () => {
    const user = userEvent.setup();
    const alertSpy = jest.spyOn(window, "alert").mockImplementation(() => {});
    renderPage("/medications/m1");

    const markBtn = screen.getByRole("button", { name: /mark as taken/i });
    expect(markBtn).toBeEnabled();
    expect(markBtn).toHaveTextContent(/mark as taken/i);

    await user.click(markBtn);

    expect(alertSpy).toHaveBeenCalledWith("Marked as taken.");
    expect(markBtn).toBeDisabled();
    expect(markBtn).toHaveTextContent(/^taken$/i);

    // "Next Dose" is split across nodes, assert the pieces instead
    expect(screen.getByText(/next dose:/i)).toBeInTheDocument();
    expect(screen.getByText(/taken\s*•\s*just now/i)).toBeInTheDocument();

    alertSpy.mockRestore();
  });

  test("Snooze updates next dose label to Snoozed until ... and alerts", async () => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date("2026-03-02T12:00:00.000Z"));

    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    const alertSpy = jest.spyOn(window, "alert").mockImplementation(() => {});
    renderPage("/medications/m1");

    await user.click(screen.getByRole("button", { name: /snooze 15 minutes/i }));

    expect(alertSpy).toHaveBeenCalledWith("Snoozed 15 minutes.");

    // same split-text issue, assert by pieces
    expect(screen.getByText(/next dose:/i)).toBeInTheDocument();
    expect(screen.getByText(/snoozed\s*•\s*until/i)).toBeInTheDocument();

    // status chip text
    expect(screen.getByText(/^snoozed$/i)).toBeInTheDocument();

    alertSpy.mockRestore();
    jest.useRealTimers();
  });

  test("Edit Schedule and Request Refill buttons alert", async () => {
    const user = userEvent.setup();
    const alertSpy = jest.spyOn(window, "alert").mockImplementation(() => {});
    renderPage("/medications/m1");

    await user.click(screen.getByRole("button", { name: /edit schedule/i }));
    expect(alertSpy).toHaveBeenCalledWith("Edit Schedule (demo): not implemented yet.");

    await user.click(screen.getByRole("button", { name: /request refill/i }));
    expect(alertSpy).toHaveBeenCalledWith("Request Refill (demo): not implemented yet.");

    alertSpy.mockRestore();
  });

  test("clicking SOS calls onSOS", async () => {
    const user = userEvent.setup();
    const { onSOS } = renderPage("/medications/m1");

    await user.click(screen.getByRole("button", { name: /sos/i }));
    expect(onSOS).toHaveBeenCalledTimes(1);
  });
});