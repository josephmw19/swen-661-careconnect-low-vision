import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { HeaderRow } from "../components/uiPieces";

type Props = {
  onSOS: () => void;
};

type Task = {
  id: string;
  title: string;
  note: string;
  dueLabel: string;
  section: "today" | "upcoming" | "completed";
};

export default function TasksPage(props: Props) {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<"all" | "today" | "upcoming" | "completed">("all");

  const tasks = useMemo<Task[]>(
    () => [
      {
        id: "t1",
        title: "Check blood pressure",
        note: "Use the provided cuff. Write down systolic/diastolic.",
        dueLabel: "Due today • 8:30 PM",
        section: "today",
      },
      {
        id: "t2",
        title: "Drink 8 glasses of water",
        note: "Spread throughout the day",
        dueLabel: "Due today • 11:30 PM",
        section: "today",
      },
      {
        id: "t3",
        title: "Take afternoon walk",
        note: "15 minutes minimum",
        dueLabel: "Due today • 3:15 PM",
        section: "today",
      },
      {
        id: "t4",
        title: "Call pharmacy for refill",
        note: "Ask about pickup time",
        dueLabel: "Due Feb 27",
        section: "upcoming",
      },
      {
        id: "t5",
        title: "Schedule annual checkup",
        note: "Coordinate with caregiver",
        dueLabel: "Due Feb 29",
        section: "upcoming",
      },
      {
        id: "t6",
        title: "Review medication list",
        note: "Confirm dosage changes",
        dueLabel: "Due Mar 1",
        section: "upcoming",
      },
      {
        id: "t7",
        title: "Take morning vitamins",
        note: "Completed at 7:10 AM",
        dueLabel: "Completed • 7:10 AM",
        section: "completed",
      },
    ],
    []
  );

  const shown = useMemo(() => {
    if (filter === "all") return tasks;
    return tasks.filter((t) => t.section === filter);
  }, [tasks, filter]);

  const today = shown.filter((t) => t.section === "today");
  const upcoming = shown.filter((t) => t.section === "upcoming");
  const completed = shown.filter((t) => t.section === "completed");

  return (
    <>
      <HeaderRow title="Tasks" onSOS={props.onSOS} />

      <div className="pageRow">
        {/* MAIN COLUMN */}
        <div className="pageMain" aria-label="Tasks main content">
          <h2 className="sectionTitle">Today&apos;s Tasks</h2>

          {/* TODAY */}
          <div className="taskSectionHeader">Today</div>
          <div className="taskStack" role="list" aria-label="Today tasks list">
            {today.map((t) => (
              <TaskRow
                key={t.id}
                task={t}
                onOpen={() => navigate(`/tasks/${t.id}`)}
                primaryLabel="Mark as Complete"
                secondaryLabel="Snooze"
              />
            ))}
            {today.length === 0 && <EmptyRow label="No tasks in this section." />}
          </div>

          {/* UPCOMING */}
          <div className="taskSectionHeader">Upcoming</div>
          <div className="taskStack" role="list" aria-label="Upcoming tasks list">
            {upcoming.map((t) => (
              <TaskRow
                key={t.id}
                task={t}
                onOpen={() => navigate(`/tasks/${t.id}`)}
                primaryLabel="Mark as Complete"
                secondaryLabel="Snooze"
              />
            ))}
            {upcoming.length === 0 && <EmptyRow label="No tasks in this section." />}
          </div>

          {/* COMPLETED */}
          <div className="taskSectionHeader">Completed</div>
          <div className="taskStack" role="list" aria-label="Completed tasks list">
            {completed.map((t) => (
              <CompletedRow key={t.id} task={t} onOpen={() => navigate(`/tasks/${t.id}`)} />
            ))}
            {completed.length === 0 && <EmptyRow label="No tasks in this section." />}
          </div>
        </div>

        {/* RIGHT PANEL */}
        <aside className="pageSide" aria-label="Task Filters panel">
          <div className="sideHeader">
            <div className="sideTitle">Task Filters</div>
          </div>

          <div className="sideCard">
            <div className="sideCardTitle">All Tasks</div>
            <div className="sideNav" role="list">
              <SideItem label="All Tasks" active={filter === "all"} onClick={() => setFilter("all")} />
              <SideItem label="Today" active={filter === "today"} onClick={() => setFilter("today")} />
              <SideItem label="Upcoming" active={filter === "upcoming"} onClick={() => setFilter("upcoming")} />
              <SideItem label="Completed" active={filter === "completed"} onClick={() => setFilter("completed")} />
            </div>
          </div>

          <div className="sideCard">
            <div className="sideCardTitle">Summary</div>
            <div className="sideMeta">
              <div className="sideMetaRow">
                <span>5 tasks remaining</span>
              </div>
              <div className="sideMetaRow">
                <span>2 completed today</span>
              </div>
            </div>
          </div>

          <div className="sideCard">
            <div className="sideCardTitle">Availability</div>
            <div className="sideMeta">
              <div className="availabilityGood">Available now</div>
              <div className="sideMetaRow">Low-stress tasks recommended</div>
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}

function TaskRow(props: {
  task: Task;
  onOpen: () => void;
  primaryLabel: string;
  secondaryLabel: string;
}) {
  return (
    <div className="taskRow" role="listitem">
      <button className="taskBody" onClick={props.onOpen} aria-label={`Open task: ${props.task.title}`}>
        <div className="taskTitle">{props.task.title}</div>
        <div className="taskNote">{props.task.note}</div>
        <div className="taskDue">{props.task.dueLabel}</div>
      </button>

      <div className="taskActions" aria-label="Task actions">
        <button className="btnPrimary" onClick={props.onOpen}>
          {props.primaryLabel}
        </button>
        <button className="btnGhost" onClick={props.onOpen}>
          {props.secondaryLabel}
        </button>
      </div>
    </div>
  );
}

function CompletedRow(props: { task: Task; onOpen: () => void }) {
  return (
    <div className="taskRow completed" role="listitem">
      <button className="taskBody" onClick={props.onOpen} aria-label={`Open task: ${props.task.title}`}>
        <div className="taskTitle">{props.task.title}</div>
        <div className="taskDue">{props.task.dueLabel}</div>
      </button>

      <div className="taskActions">
        <button className="btnSubtle" onClick={props.onOpen}>
          View Details
        </button>
      </div>
    </div>
  );
}

function EmptyRow(props: { label: string }) {
  return <div className="emptyRow">{props.label}</div>;
}

function SideItem(props: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button className={props.active ? "sideItem active" : "sideItem"} onClick={props.onClick}>
      {props.label}
    </button>
  );
}