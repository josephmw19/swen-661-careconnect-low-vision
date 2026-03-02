// src/ui/_tests_/AppointmentsPage.test.tsx
import React from "react";
import { render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import AppointmentsPage from "../pages/AppointmentsPage";

// Mock HeaderRow only, keep real component under test.
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

function renderPage() {
  const onSOS = jest.fn();
  render(
    <MemoryRouter initialEntries={["/appointments"]}>
      <AppointmentsPage onSOS={onSOS} />
    </MemoryRouter>
  );
  return { onSOS };
}

describe("AppointmentsPage", () => {
  beforeEach(() => {
    mockNavigate.mockReset();
  });

  test("renders header and list of appointments", () => {
    renderPage();

    // Header from mocked HeaderRow
    expect(screen.getByRole("heading", { level: 1, name: /appointments/i })).toBeInTheDocument();

    // Section title
    expect(screen.getByText(/upcoming appointments/i)).toBeInTheDocument();

    // List + items
    const list = screen.getByRole("list", { name: /appointments list/i });
    const items = within(list).getAllByRole("listitem");
    expect(items.length).toBe(5);

    // Spot-check a known provider
    expect(screen.getByText(/dr\. sarah johnston/i)).toBeInTheDocument();
    expect(screen.getByText(/primary care/i)).toBeInTheDocument();
  });

  test("clicking an appointment body navigates to /appointments/:id", () => {
    renderPage();

    const openBtn = screen.getByRole("button", {
      name: /open appointment:\s*dr\. sarah johnston/i,
    });
    openBtn.click();

    expect(mockNavigate).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledWith("/appointments/a1");
  });

  test("clicking View Details navigates to /appointments/:id", () => {
    renderPage();

    const viewBtn = screen.getByRole("button", { name: /view details for dr\. michael chen/i });
    viewBtn.click();

    expect(mockNavigate).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledWith("/appointments/a2");
  });

  test("clicking SOS calls onSOS", () => {
    const { onSOS } = renderPage();

    screen.getByRole("button", { name: /sos/i }).click();
    expect(onSOS).toHaveBeenCalledTimes(1);
  });
});