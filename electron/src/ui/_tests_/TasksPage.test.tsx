// src/ui/_tests_/TasksPage.test.tsx
import React from "react";
import { fireEvent, render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import TasksPage from "../pages/TasksPage";

// Mock HeaderRow so this test doesn't depend on its implementation
jest.mock("../components/uiPieces", () => ({
  HeaderRow: (props: { title: string; onSOS: () => void }) => (
    <div>
      <h1>{props.title}</h1>
      <button onClick={props.onSOS}>SOS</button>
    </div>
  ),
}));

function renderPage() {
  const onSOS = jest.fn();
  render(
    <MemoryRouter initialEntries={["/tasks"]}>
      <TasksPage onSOS={onSOS} />
    </MemoryRouter>
  );
  return { onSOS };
}

describe("TasksPage", () => {
  test("renders sections and initial tasks", () => {
    renderPage();

    // Page heading from mocked HeaderRow
    expect(screen.getByRole("heading", { level: 1, name: /^tasks$/i })).toBeInTheDocument();

    // Lists exist
    expect(screen.getByRole("list", { name: /today tasks list/i })).toBeInTheDocument();
    expect(screen.getByRole("list", { name: /upcoming tasks list/i })).toBeInTheDocument();
    expect(screen.getByRole("list", { name: /completed tasks list/i })).toBeInTheDocument();

    // Spot-check a couple task titles
    expect(screen.getByText(/check blood pressure/i)).toBeInTheDocument();
    expect(screen.getByText(/schedule annual checkup/i)).toBeInTheDocument();
    expect(screen.getByText(/take morning vitamins/i)).toBeInTheDocument();
  });

  test("filter buttons change which sections show tasks", () => {
    renderPage();

    // Start with "all": should show a Today and Upcoming task
    expect(screen.getByText(/check blood pressure/i)).toBeInTheDocument();
    expect(screen.getByText(/call pharmacy for refill/i)).toBeInTheDocument();

    // Click "Today" filter
    fireEvent.click(screen.getByRole("button", { name: /^today$/i }));
    expect(screen.getByText(/check blood pressure/i)).toBeInTheDocument();
    expect(screen.queryByText(/call pharmacy for refill/i)).not.toBeInTheDocument();

    // Click "Upcoming" filter
    fireEvent.click(screen.getByRole("button", { name: /^upcoming$/i }));
    expect(screen.getByText(/call pharmacy for refill/i)).toBeInTheDocument();
    expect(screen.queryByText(/check blood pressure/i)).not.toBeInTheDocument();

    // Click "Completed" filter
    fireEvent.click(screen.getByRole("button", { name: /^completed$/i }));
    expect(screen.getByText(/take morning vitamins/i)).toBeInTheDocument();
    expect(screen.queryByText(/call pharmacy for refill/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/check blood pressure/i)).not.toBeInTheDocument();

    // Back to "All Tasks"
    fireEvent.click(screen.getByRole("button", { name: /^all tasks$/i }));
    expect(screen.getByText(/check blood pressure/i)).toBeInTheDocument();
    expect(screen.getByText(/call pharmacy for refill/i)).toBeInTheDocument();
    expect(screen.getByText(/take morning vitamins/i)).toBeInTheDocument();
  });

  test("marking a task complete moves it to Completed list and updates label", () => {
    renderPage();

    const todayList = screen.getByRole("list", { name: /today tasks list/i });
    const completedList = screen.getByRole("list", { name: /completed tasks list/i });

    // Find the row for "Check blood pressure" by its open button label
    const openBtn = screen.getByRole("button", { name: /open task: check blood pressure/i });
    const row = openBtn.closest(".taskRow");
    expect(row).toBeTruthy();

    // Click "Mark as Complete" inside that row
    const completeBtn = within(row as HTMLElement).getByRole("button", { name: /mark as complete/i });
    fireEvent.click(completeBtn);

    // It should no longer appear in Today list
    expect(within(todayList).queryByText(/check blood pressure/i)).not.toBeInTheDocument();

    // It should appear in Completed list
    expect(within(completedList).getByText(/check blood pressure/i)).toBeInTheDocument();

    // Due label should change to "Completed • just now"
    const completedOpen = within(completedList).getByRole("button", {
        name: /open task: check blood pressure/i,
    });
        expect(within(completedOpen).getByText(/completed • just now/i)).toBeInTheDocument();
  });

  test("snoozing a task updates its due label to Snoozed until ...", () => {
    // Freeze time so the "until" time is deterministic
    jest.useFakeTimers();
    jest.setSystemTime(new Date("2026-03-01T12:00:00.000Z"));

    renderPage();

    const openBtn = screen.getByRole("button", { name: /open task: drink 8 glasses of water/i });
    const row = openBtn.closest(".taskRow");
    expect(row).toBeTruthy();

    const snoozeBtn = within(row as HTMLElement).getByRole("button", { name: /^snooze$/i });
    fireEvent.click(snoozeBtn);

    // Due label should become "Snoozed • until <time>"
    expect(within(row as HTMLElement).getByText(/snoozed • until/i)).toBeInTheDocument();

    jest.useRealTimers();
  });

  test("clicking SOS calls onSOS", () => {
    const { onSOS } = renderPage();
    fireEvent.click(screen.getByRole("button", { name: /sos/i }));
    expect(onSOS).toHaveBeenCalledTimes(1);
  });
});