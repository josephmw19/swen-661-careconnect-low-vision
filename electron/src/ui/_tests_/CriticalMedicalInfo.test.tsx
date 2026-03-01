import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { CriticalMedicalInfo } from "../components/uiPieces"; // Ensure this path is correct

describe("CriticalMedicalInfo Component", () => {
  test("expands and collapses correctly", () => {
    const onToggle = jest.fn();
    render(<CriticalMedicalInfo open={true} onToggle={onToggle} />);

    // Target by the text content or label
    const toggleBtn = screen.getByRole("button", { name: /critical medical information/i });
    expect(toggleBtn).toHaveAttribute("aria-expanded", "true");

    fireEvent.click(toggleBtn);
    expect(onToggle).toHaveBeenCalled();
  });
});