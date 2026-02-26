import React from "react";
import { useNavigate } from "react-router-dom";
import { HeaderRow, CriticalMedicalInfo } from "../components/uiPieces";

type Props = {
  criticalOpen: boolean;
  onToggleCritical: () => void;
  onSOS: () => void;
};

type Task = {
  id: string;
  title: string;
  detail: string;
  due: string;
  status: "today" | "upcoming" | "completed";
};

const TASKS: Task[] = [
  {
    id: "check-bp",
    title: "Check blood pressure",
    detail: "Record results using home monitor",
    due: "Due today at 11:30 AM",
    status: "today",
  },
  {
    id: "drink-water",
    title: "Drink 8 glasses of water",
    detail: "Stay hydrated throughout the day",
    due: "Due today at 8:00 PM",
    status: "today",
  },
  {
    id: "call-pharmacy",
    title: "Call pharmacy for refill",
    detail: "Lisinopril 10mg refill due soon",
    due: "Due Fri",
    status: "upcoming",
  },
  {
    id: "review-instructions",
    title: "Review medication label",
    detail: "Confirm evening dosage instructions",
    due: "Due Sat",
    status: "upcoming",
  },
  {
    id: "bp-completed",
    title: "Take morning vitamins",
    detail: "Completed at 7:10 AM",
    due: "Completed",
    status: "completed",
  },
];

function TaskCard(props: {
  task: Task;
  onOpen: () => void;
  rightButtonLabel: string;
}) {
  return (
    <div className="task-card" tabIndex={0} aria-label={`${props.task.title}. ${props.task.due}`}>
      <div className="task-left">
        <div className="task-title-row">
          <button className="task-open" onClick={props.onOpen} aria-label={`Open ${props.task.title}`}>
            {props.task.title}
          </button>
        </div>
        <div className="task-sub">{props.task.detail}</div>
        <div className="task-due">{props.task.due}</div>
      </div>

      <div className="task-actions">
        <button className="primary" aria-label={props.rightButtonLabel}>
          {props.rightButtonLabel}
        </button>
        <button className="secondary" aria-label="Snooze">
          Snooze
        </button>
      </div>
    </div>
  );
}

export default function TasksPage(props: Props) {
  const nav = useNavigate();

  const today = TASKS.filter((t) => t.status === "today");
  const upcoming = TASKS.filter((t) => t.status === "upcoming");
  const completed = TASKS.filter((t) => t.status === "completed");

  return (
    <>
      <HeaderRow title="Tasks" onSOS={props.onSOS} />

      <div className="tasks-layout">
        <div className="tasks-main">
          <div className="tasks-subtitle">Today's Tasks</div>

          <CriticalMedicalInfo open={props.criticalOpen} onToggle={props.onToggleCritical} />

          <section className="tasks-section" aria-label="Today">
            <div className="tasks-section-title">Today</div>
            {today.map((t) => (
              <TaskCard
                key={t.id}
                task={t}
                onOpen={() => nav(`/tasks/${t.id}`)}
                rightButtonLabel="Mark as Complete"
              />
            ))}
          </section>

          <section className="tasks-section" aria-label="Upcoming">
            <div className="tasks-section-title">Upcoming</div>
            {upcoming.map((t) => (
              <TaskCard
                key={t.id}
                task={t}
                onOpen={() => nav(`/tasks/${t.id}`)}
                rightButtonLabel="Mark as Complete"
              />
            ))}
          </section>

          <section className="tasks-section" aria-label="Completed">
            <div className="tasks-section-title">Completed</div>
            {completed.map((t) => (
              <div key={t.id} className="task-card completed" tabIndex={0}>
                <div className="task-left">
                  <div className="task-title">{t.title}</div>
                  <div className="task-sub">{t.detail}</div>
                </div>
                <div className="task-actions">
                  <button
                    className="secondary"
                    onClick={() => nav(`/tasks/${t.id}`)}
                    aria-label={`View details for ${t.title}`}
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </section>
        </div>

        <aside className="tasks-side" aria-label="Tasks side panel">
          <section className="card" aria-label="Task Filters">
            <div className="cardhead static">
              <span>Task Filters</span>
            </div>
            <div className="cardbody">
              <div className="filter-item active" tabIndex={0} aria-label="My Tasks selected">
                My Tasks
              </div>
              <div className="filter-item" tabIndex={0} aria-label="Today">
                Today
              </div>
              <div className="filter-item" tabIndex={0} aria-label="Upcoming">
                Upcoming
              </div>
              <div className="filter-item" tabIndex={0} aria-label="Completed">
                Completed
              </div>
            </div>
          </section>

          <section className="card" aria-label="Summary">
            <div className="cardhead static">
              <span>Summary</span>
            </div>
            <div className="cardbody">
              <div className="summary-row">
                <span>Today</span>
                <strong>{today.length}</strong>
              </div>
              <div className="summary-row">
                <span>Upcoming</span>
                <strong>{upcoming.length}</strong>
              </div>
              <div className="summary-row">
                <span>Completed</span>
                <strong>{completed.length}</strong>
              </div>
            </div>
          </section>

          <section className="card" aria-label="Accessibility">
            <div className="cardhead static">
              <span>Accessibility</span>
            </div>
            <div className="cardbody">
              <div className="helper-text">
                High contrast enabled. Use Tab to move, Enter to activate buttons.
              </div>
            </div>
          </section>
        </aside>
      </div>
    </>
  );
}