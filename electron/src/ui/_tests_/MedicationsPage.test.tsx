// src/ui/_tests_/MedicationsPage.test.tsx
import React from "react";
import { render, screen } from "@testing-library/react";
import MedicationsPage from "../pages/MedicationsPage";

/**
 * Mock uiPieces so we don't depend on its internal layout.
 * We only care that MedicationsPage wires props + renders the list.
 */
jest.mock("../components/uiPieces", () => ({
  HeaderRow: ({ title, onSOS }: { title: string; onSOS: () => void }) => (
    <div>
      <h1>{title}</h1>
      <button type="button" onClick={onSOS}>
        SOS
      </button>
    </div>
  ),
  MedicationsList: () => <div aria-label="Medications list">MedicationsList</div>,
}));

describe("MedicationsPage", () => {
  test("renders header, section title, and medications list", () => {
    const onSOS = jest.fn();
    render(<MedicationsPage onSOS={onSOS} />);

    // HeaderRow title
    expect(screen.getByRole("heading", { level: 1, name: /medications/i })).toBeInTheDocument();

    // Main content container
    expect(screen.getByLabelText(/medications content/i)).toBeInTheDocument();

    // Section title
    expect(screen.getByText(/today's medications/i)).toBeInTheDocument();

    // List stub
    expect(screen.getByLabelText(/medications list/i)).toBeInTheDocument();
  });

  test("clicking SOS calls onSOS", () => {
    const onSOS = jest.fn();
    render(<MedicationsPage onSOS={onSOS} />);

    screen.getByRole("button", { name: /sos/i }).click();
    expect(onSOS).toHaveBeenCalledTimes(1);
  });
});