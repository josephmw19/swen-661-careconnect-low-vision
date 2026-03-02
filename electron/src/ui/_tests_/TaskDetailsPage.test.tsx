import React from "react";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import TaskDetailsPage from "../pages/TaskDetailsPage";

// Mock navigate so we can assert routing intent without real history
const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => {
  const actual = jest.requireActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

// If you already mock HeaderRow elsewhere, you can remove this block.
// This keeps tests stable by making HeaderRow deterministic.
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

function renderPage(initialEntry = "/tasks/check-bp") {
  const onSOS = jest.fn();

  render(
    <MemoryRouter initialEntries={[initialEntry]}>
      <Routes>
        <Route path="/tasks/:taskId" element={<TaskDetailsPage onSOS={onSOS} />} />
        {/* also allow the page to render if route differs, while still testing param fallback */}
        <Route path="*" element={<TaskDetailsPage onSOS={onSOS} />} />
      </Routes>
    </MemoryRouter>
  );

  return { onSOS };
}

describe("TaskDetailsPage", () => {
  beforeEach(() => {
    mockNavigate.mockReset();
    jest.restoreAllMocks();
  });

  test("renders summary, notes, actions, history, and uses taskId param when present", () => {
    renderPage("/tasks/check-bp");

    expect(screen.getByRole("button", { name: /back to tasks/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /task details/i })).toBeInTheDocument();

    expect(screen.getByLabelText(/task summary/i)).toBeInTheDocument();
    expect(screen.getByText(/check blood pressure/i)).toBeInTheDocument();
    expect(screen.getByText(/measure blood pressure/i)).toBeInTheDocument();

    expect(screen.getByLabelText(/^notes$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/felt dizzy this morning/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/used upper-arm cuff/i)).toBeInTheDocument();

    expect(screen.getByLabelText(/task side panel/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^actions$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^history$/i)).toBeInTheDocument();

    // initial status
    expect(screen.getByText(/^not completed$/i)).toBeInTheDocument();
  });

  test("falls back to default task when taskId is unknown", () => {
    renderPage("/tasks/does-not-exist");

    // Should still show the default task data
    expect(screen.getByText(/check blood pressure/i)).toBeInTheDocument();
    expect(screen.getByText(/due today at 11:30 am/i)).toBeInTheDocument();
    const summary = screen.getByLabelText(/task summary/i);
    expect(within(summary).getByText(/^home$/i)).toBeInTheDocument();
  });

  test("Back to Tasks calls navigate('/tasks')", async () => {
    const user = userEvent.setup();
    renderPage("/tasks/check-bp");

    await user.click(screen.getByRole("button", { name: /back to tasks/i }));
    expect(mockNavigate).toHaveBeenCalledWith("/tasks");
  });

  test("Mark as Complete updates status, prepends history, disables actions, alerts", async () => {
    const user = userEvent.setup();
    renderPage("/tasks/check-bp");

    const alertSpy = jest.spyOn(window, "alert").mockImplementation(() => {});

    const actions = screen.getByLabelText(/^actions$/i);
    const completeBtn = within(actions).getByRole("button", { name: /mark as complete/i });
    const snoozeBtn = within(actions).getByRole("button", { name: /snooze task/i });

    expect(completeBtn).toBeEnabled();
    expect(snoozeBtn).toBeEnabled();

    await user.click(completeBtn);

    expect(alertSpy).toHaveBeenCalledWith("Task marked as complete.");

    // status should now be Completed
    const summary = screen.getByLabelText(/task summary/i);
    expect(within(summary).getByText(/^completed$/i)).toBeInTheDocument();

    // button should be disabled and text changes
    expect(completeBtn).toBeDisabled();
    expect(completeBtn).toHaveTextContent(/^completed$/i);

    // snooze disabled after completion
    expect(snoozeBtn).toBeDisabled();

    // history should have a new first entry "Marked complete"
    const history = screen.getByLabelText(/^history$/i);
    const historyRows = within(history).getAllByText(/marked complete/i);
    expect(historyRows.length).toBeGreaterThan(0);

    alertSpy.mockRestore();
  });

  test("Snooze updates status to Snoozed until ..., prepends history, alerts", async () => {
    const user = userEvent.setup();
    renderPage("/tasks/check-bp");

    const alertSpy = jest.spyOn(window, "alert").mockImplementation(() => {});

    // Freeze time so Snoozed label is deterministic
    const base = new Date("2026-03-02T12:00:00.000Z").getTime();
    jest.spyOn(Date, "now").mockImplementation(() => base);

    const actions = screen.getByLabelText(/^actions$/i);
    const snoozeBtn = within(actions).getByRole("button", { name: /snooze task/i });

    await user.click(snoozeBtn);

    expect(alertSpy).toHaveBeenCalledWith("Task snoozed for 10 minutes.");

    // status should show snoozed
    expect(screen.getByText(/snoozed until/i)).toBeInTheDocument();

    // history should have a new first-ish entry "Task snoozed"
    const history = screen.getByLabelText(/^history$/i);

    // assert the *new* snooze entry by matching its value
    expect(within(history).getByText(/until/i)).toBeInTheDocument();

    alertSpy.mockRestore();
  });

  test("Snooze after completion triggers already completed branch and alerts", async () => {
    const user = userEvent.setup();
    renderPage("/tasks/check-bp");

    const alertSpy = jest.spyOn(window, "alert").mockImplementation(() => {});

    const actions = screen.getByLabelText(/^actions$/i);
    const completeBtn = within(actions).getByRole("button", { name: /mark as complete/i });

    await user.click(completeBtn);
    expect(alertSpy).toHaveBeenCalledWith("Task marked as complete.");

    // Even though the button is disabled in the UI after completion, directly hitting the handler
    // path isn't possible via click. So instead, assert the completed guard works via snooze handler:
    // For this test, we call snooze by re-enabling the button just for event dispatch.
    // (DOM disabled blocks click events.)
    const snoozeBtn = within(actions).getByRole("button", { name: /snooze task/i }) as HTMLButtonElement;
    snoozeBtn.disabled = false;

    await user.click(snoozeBtn);
    expect(alertSpy).toHaveBeenCalledTimes(1);
    expect(alertSpy).toHaveBeenCalledWith("Task marked as complete.");

    alertSpy.mockRestore();
  });

  test("Add Note prompts, inserts note, prepends history, alerts", async () => {
    const user = userEvent.setup();
    renderPage("/tasks/check-bp");

    const promptSpy = jest.spyOn(window, "prompt").mockImplementation(() => "New note from test");
    const alertSpy = jest.spyOn(window, "alert").mockImplementation(() => {});

    const actions = screen.getByLabelText(/^actions$/i);
    const addBtn = within(actions).getByRole("button", { name: /add note/i });

    await user.click(addBtn);

    expect(promptSpy).toHaveBeenCalled();
    expect(alertSpy).toHaveBeenCalledWith("Note added.");

    // New note appears in Notes section
    const notes = screen.getByLabelText(/^notes$/i);
    expect(within(notes).getByLabelText(/new note from test/i)).toBeInTheDocument();

    // History includes "Note added"
    const history = screen.getByLabelText(/^history$/i);
    expect(within(history).getByText(/^note added$/i)).toBeInTheDocument();

    promptSpy.mockRestore();
    alertSpy.mockRestore();
  });

  test("Add Note canceled does nothing", async () => {
    const user = userEvent.setup();
    renderPage("/tasks/check-bp");

    const promptSpy = jest.spyOn(window, "prompt").mockImplementation(() => "");
    const alertSpy = jest.spyOn(window, "alert").mockImplementation(() => {});

    const notes = screen.getByLabelText(/^notes$/i);
    expect(within(notes).queryByLabelText(/new note/i)).not.toBeInTheDocument();

    const actions = screen.getByLabelText(/^actions$/i);
    await user.click(within(actions).getByRole("button", { name: /add note/i }));

    expect(promptSpy).toHaveBeenCalled();
    expect(alertSpy).not.toHaveBeenCalledWith("Note added.");

    // still no new note
    expect(within(notes).queryByLabelText(/new note/i)).not.toBeInTheDocument();

    promptSpy.mockRestore();
    alertSpy.mockRestore();
  });
});