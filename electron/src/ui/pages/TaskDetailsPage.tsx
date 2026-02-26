import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { HeaderRow } from "../components/uiPieces";

type Props = {
  onSOS: () => void;
};

const TASKS: Record<
  string,
  {
    id: string;
    title: string;
    description: string;
    dueLabel: string;
    location: string;
    note1: string;
    note2: string;
    history: { label: string; value: string }[];
  }
> = {
  "check-bp": {
    id: "check-bp",
    title: "Check blood pressure",
    description:
      "Measure blood pressure using home monitor and record the result.",
    dueLabel: "Due today at 11:30 AM",
    location: "Home",
    note1: "Felt dizzy this morning",
    note2: "Used upper-arm cuff",
    history: [
      { label: "Task created", value: "Jan 28, 2026" },
      { label: "Reminder set", value: "Today at 9:00 AM" },
      { label: "Task snoozed", value: "Today at 10:15 AM" },
    ],
  },
};

export default function TaskDetailsPage(props: Props) {
  const nav = useNavigate();
  const params = useParams();
  const taskId = params.taskId ?? "check-bp";
  const task = TASKS[taskId] ?? TASKS["check-bp"];

  return (
    <>
      <div style={{ marginBottom: 10 }}>
        <button
          className="secondary"
          onClick={() => nav("/tasks")}
          aria-label="Back to Tasks"
        >
          Back to Tasks
        </button>
      </div>

      <HeaderRow title="Task Details" onSOS={props.onSOS} />

      <div className="tasks-layout">
        <div className="tasks-main">
          <section className="card wide" aria-label="Task Summary">
            <div className="cardhead static">
              <span>Task Summary</span>
            </div>
            <div className="cardbody">
              <div className="task-title">{task.title}</div>
              <div className="task-desc">{task.description}</div>

              <div className="task-meta">
                <div className="meta-row">
                  <span className="meta-label">Due Date and Time</span>
                  <span className="meta-value">{task.dueLabel}</span>
                </div>
                <div className="meta-row">
                  <span className="meta-label">Location</span>
                  <span className="meta-value">{task.location}</span>
                </div>
              </div>
            </div>
          </section>

          <section className="card wide" aria-label="Notes">
            <div className="cardhead static">
              <span>Notes</span>
            </div>
            <div className="cardbody">
              <div className="note-box" tabIndex={0} aria-label={task.note1}>
                {task.note1}
              </div>
              <div className="note-box" tabIndex={0} aria-label={task.note2}>
                {task.note2}
              </div>
            </div>
          </section>
        </div>

        <aside className="tasks-side" aria-label="Task side panel">
          <section className="card" aria-label="Actions">
            <div className="cardhead static">
              <span>Actions</span>
            </div>
            <div className="cardbody">
              <button className="primary widebtn" aria-label="Mark as Complete">
                Mark as Complete
              </button>
              <button className="secondary widebtn" aria-label="Snooze Task">
                Snooze Task
              </button>
              <button className="secondary widebtn" aria-label="Add Note">
                Add Note
              </button>
            </div>
          </section>

          <section className="card" aria-label="History">
            <div className="cardhead static">
              <span>History</span>
            </div>
            <div className="cardbody">
              {task.history.map((h) => (
                <div key={h.label} className="history-row">
                  <div className="history-label">{h.label}</div>
                  <div className="history-value">{h.value}</div>
                </div>
              ))}
            </div>
          </section>
        </aside>
      </div>
    </>
  );
}