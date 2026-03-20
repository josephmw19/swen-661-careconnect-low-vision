import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import DashboardPage from "../pages/DashboardPage";

describe("DashboardPage", () => {
  test("renders header and all main cards", () => {
    render(
      <DashboardPage
        criticalOpen={false}
        onToggleCritical={jest.fn()}
        onSOS={jest.fn()}
      />
    );

    // Header
    expect(screen.getByRole("heading", { name: /dashboard/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /sos emergency/i })).toBeInTheDocument();

    // Cards/sections
    expect(
      screen.getByRole("region", { name: /critical medical information/i })
    ).toBeInTheDocument();

    expect(screen.getByLabelText(/today's tasks/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/next medication/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/alerts and notifications/i)).toBeInTheDocument();
  });

  test("calls onSOS when SOS is clicked", () => {
    const onSOS = jest.fn();

    render(
      <DashboardPage
        criticalOpen={false}
        onToggleCritical={jest.fn()}
        onSOS={onSOS}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: /sos emergency/i }));
    expect(onSOS).toHaveBeenCalledTimes(1);
  });

  test("calls onToggleCritical when critical section header is clicked", () => {
    const onToggleCritical = jest.fn();

    render(
      <DashboardPage
        criticalOpen={false}
        onToggleCritical={onToggleCritical}
        onSOS={jest.fn()}
      />
    );

    // This is the collapsible header button for the critical section
    fireEvent.click(
      screen.getByRole("button", { name: /critical medical information/i })
    );

    expect(onToggleCritical).toHaveBeenCalledTimes(1);
  });

  test("shows critical content only when open", () => {
    const { rerender } = render(
      <DashboardPage
        criticalOpen={false}
        onToggleCritical={jest.fn()}
        onSOS={jest.fn()}
      />
    );

    // Closed: helper text not visible
    expect(
      screen.queryByText(/for first responders and caregivers/i)
    ).not.toBeInTheDocument();

    rerender(
      <DashboardPage
        criticalOpen={true}
        onToggleCritical={jest.fn()}
        onSOS={jest.fn()}
      />
    );

    // Open: helper text visible
    expect(
      screen.getByText(/for first responders and caregivers/i)
    ).toBeInTheDocument();
  });
});