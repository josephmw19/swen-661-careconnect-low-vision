import React from "react";
import { useNavigate } from "react-router-dom";

export function TopBar(props: {
  readAloud: boolean;
  voiceCommands: boolean;
  onToggleRead: () => void;
  onToggleVoice: () => void;
  onRefresh: () => void;
  onOpenSettings: () => void;
}) {
  return (
    <div className="topbar" role="banner" aria-label="Global Toolbar">
      <div className="menubar-placeholder" aria-hidden="true">
        <span>File</span><span>Edit</span><span>View</span><span>Navigate</span><span>Help</span>
      </div>

      <div className="toolbar" aria-label="Quick Actions Toolbar">
        <button
          className="toolbtn"
          aria-pressed={props.readAloud}
          aria-label="Read Aloud toggle"
          onClick={props.onToggleRead}
        >
          Read Aloud
        </button>
        <button
          className="toolbtn"
          aria-pressed={props.voiceCommands}
          aria-label="Voice Commands toggle"
          onClick={props.onToggleVoice}
        >
          Voice Commands
        </button>
        <button className="toolbtn" aria-label="Refresh" onClick={props.onRefresh}>
          Refresh
        </button>
        <button className="toolbtn" aria-label="Open Settings" onClick={props.onOpenSettings}>
          Open Settings
        </button>
      </div>
    </div>
  );
}

export function Sidebar(props: {
  activePath: string;
  onNavigate: (path: string) => void;
  sidebarRef: React.RefObject<HTMLElement | null>;
}) {
  return (
    <nav className="sidebar" aria-label="Primary Navigation" ref={props.sidebarRef as any}>
      <div className="appname" aria-label="Application Name">
        CareConnect
      </div>

      <ul className="navlist" aria-label="Navigation Links">
        <li>
          <button
            data-focus-start="sidebar"
            className={props.activePath === "/" ? "navitem active" : "navitem"}
            onClick={() => props.onNavigate("/")}
            aria-current={props.activePath === "/" ? "page" : undefined}
          >
            Home
          </button>
        </li>

        <li>
          <button
            className={props.activePath === "/medications" ? "navitem active" : "navitem"}
            onClick={() => props.onNavigate("/medications")}
            aria-current={props.activePath === "/medications" ? "page" : undefined}
          >
            Medications
          </button>
        </li>

        <li>
          <button
            className={props.activePath === "/tasks" ? "navitem active" : "navitem"}
            onClick={() => props.onNavigate("/tasks")}
            aria-current={props.activePath === "/tasks" ? "page" : undefined}
          >
            Tasks
          </button>
        </li>

        <li>
          <button
            className={props.activePath === "/appointments" ? "navitem active" : "navitem"}
            onClick={() => props.onNavigate("/appointments")}
            aria-current={props.activePath === "/appointments" ? "page" : undefined}
          >
            Appointments
          </button>
        </li>

        <li>
          <button
            className={props.activePath === "/settings" ? "navitem active" : "navitem"}
            onClick={() => props.onNavigate("/settings")}
            aria-current={props.activePath === "/settings" ? "page" : undefined}
          >
            Settings
          </button>
        </li>
      </ul>
    </nav>
  );
}

export function HeaderRow(props: { title: string; onSOS: () => void }) {
  return (
    <div className="headerrow">
      <h1 className="title">{props.title}</h1>
      <button className="sos" aria-label="SOS Emergency" onClick={props.onSOS}>
        SOS
      </button>
    </div>
  );
}

export function CriticalMedicalInfo(props: { open: boolean; onToggle: () => void }) {
  const contentId = "critical-medical-info-content";

  return (
    <section className="card critical" aria-labelledby="critical-medical-info-heading" role="region">
      <button
        className="cardhead"
        aria-expanded={props.open}
        aria-controls={contentId}
        onClick={props.onToggle}
      >
        <span id="critical-medical-info-heading">
          Critical Medical Information (Emergency Use)
        </span>
        <span className="sr-only">
          {props.open ? "Collapse section" : "Expand section"}
        </span>
        <span aria-hidden="true">{props.open ? "▾" : "▸"}</span>
      </button>

      {props.open && (
        <div id={contentId} className="cardbody">
          <p className="helper-text">
            For first responders and caregivers. Includes allergies, conditions, and emergency contact.
          </p>

          <div className="infoBlock">
            <div className="label">Blood Type</div>
            <div className="value">A+</div>
          </div>

          <div className="infoBlock">
            <div className="label">Allergies</div>
            <ul className="bullets" aria-label="Allergies list">
              <li>Penicillin</li>
              <li>Peanuts</li>
              <li>Latex</li>
            </ul>
          </div>

          <div className="infoBlock">
            <div className="label">Medical Conditions</div>
            <ul className="bullets" aria-label="Medical conditions list">
              <li>Type 2 Diabetes</li>
              <li>Hypertension</li>
              <li>Asthma</li>
            </ul>
          </div>

          <div className="divider" role="separator" />

          <div className="infoBlock" aria-label="Emergency contact information">
            <div className="label">Emergency Contact</div>
            <div className="value">
              <strong>Name:</strong> Sarah Doe
            </div>
            <div className="value">
              <strong>Relationship:</strong> Daughter
            </div>
            <div className="value">
              <strong>Phone:</strong>{" "}
              <a
                className="linklike"
                href="tel:+15551234567"
                aria-label="Call emergency contact at 555 123 4567"
              >
                (555) 123-4567
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export function TodaysTasks() {
  return (
    <section className="card" aria-label="Today's Tasks">
      <div className="cardhead static">
        <span>Today's Tasks</span>
      </div>
      <div className="cardbody">
        <TaskItem title="Take morning vitamins" status="Not completed" />
        <TaskItem title="Check blood pressure" status="Completed at 7:45 AM" />
        <TaskItem title="Drink 8 glasses of water" status="Not completed" />
        <TaskItem title="Take afternoon walk" status="Not completed" />
      </div>
    </section>
  );
}

export function TaskItem(props: { title: string; status: string }) {
  return (
    <div className="listitem" tabIndex={0} aria-label={`${props.title}. ${props.status}`}>
      <div className="listtitle">{props.title}</div>
      <div className="listmeta">{props.status}</div>
    </div>
  );
}

export function NextMedication() {
  return (
    <section className="card" aria-label="Next Medication">
      <div className="cardhead static">
        <span>Next Medication</span>
      </div>
      <div className="cardbody">
        <div className="medname">Lisinopril 10mg</div>
        <div className="medmeta">Take 1 tablet by mouth</div>
        <div className="medmeta">Once daily with breakfast</div>
        <div className="medstatus">Due in 15 minutes</div>

        <div className="actions">
          <button className="primary" aria-label="Mark as Taken">Mark as Taken</button>
          <button className="secondary" aria-label="Snooze 10 minutes">Snooze 10 min</button>
        </div>
      </div>
    </section>
  );
}

export function Alerts() {
  return (
    <section className="card" aria-label="Alerts and Notifications">
      <div className="cardhead static">
        <span>Alerts & Notifications</span>
      </div>
      <div className="cardbody">
        <div className="alertitem" tabIndex={0} aria-label="Refill due in 3 days. Lisinopril 10mg">
          <div className="listtitle">Refill due in 3 days</div>
          <div className="listmeta">Lisinopril 10mg</div>
        </div>
        <div className="alertitem" tabIndex={0} aria-label="Upcoming appointment. Dr. Smith tomorrow at 2:00 PM">
          <div className="listtitle">Upcoming appointment</div>
          <div className="listmeta">Dr. Smith - Tomorrow at 2:00 PM</div>
        </div>
      </div>
    </section>
  );
}

export function MedicationsList() {
  const navigate = useNavigate();
  const meds = [
    {
      id: "m1",
      name: "Lisinopril 10mg",
      details: ["1 tablet by mouth", "Once daily with breakfast"],
      status: "Due now",
      statusTone: "warn",
      primary: true,
    },
    {
      id: "m2",
      name: "Metformin 500mg",
      details: ["1 tablet with breakfast", "Once daily"],
      status: "Taken today at 8:15 AM",
      statusTone: "ok",
      primary: false,
    },
    {
      id: "m3",
      name: "Atorvastatin 20mg",
      details: ["1 tablet by mouth", "Once daily at bedtime"],
      status: "Scheduled for 9:00 PM",
      statusTone: "info",
      primary: false,
    },
    {
      id: "m4",
      name: "Levothyroxine 75mcg",
      details: ["1 tablet by mouth", "Once daily before breakfast"],
      status: "Taken today at 7:00 AM",
      statusTone: "ok",
      primary: false,
    },
    {
      id: "m5",
      name: "Omeprazole 20mg",
      details: ["1 capsule by mouth", "Once daily before breakfast"],
      status: "Taken today at 7:05 AM",
      statusTone: "ok",
      primary: false,
    },
    {
      id: "m6",
      name: "Aspirin 81mg",
      details: ["1 tablet by mouth", "Once daily with breakfast"],
      status: "Taken today at 8:20 AM",
      statusTone: "ok",
      primary: false,
    },
  ] as const;

  return (
    <section className="card wide" aria-label="Medications list">
      <div className="cardbody">
        <div className="medStack" role="list" aria-label="Medication rows">
          {meds.map((m) => (
            <div
              key={m.id}
              className="medRowNew"
              role="listitem"
              onClick={() => navigate(`/medications/${m.id}`)}
              style={{ cursor: "pointer" }}
            >
              <div className="medLeft">
                <div className="medNameNew">{m.name}</div>
                {m.details.map((d) => (
                  <div key={d} className="medLine">
                    {d}
                  </div>
                ))}
                <div className={`medStatusNew ${m.statusTone}`} aria-label={`Status: ${m.status}`}>
                  {m.status}
                </div>
              </div>

              <div className="medRight" aria-label="Medication actions">
                {m.primary && (
                  <button className="btnPrimary" aria-label={`Mark ${m.name} as taken`}>
                    Mark as Taken
                  </button>
                )}
                <button
                  className="btnGhost"
                  aria-label={`View details for ${m.name}`}
                  onClick={() => navigate(`/medications/${m.id}`)}
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function SettingsPanel(props: {
  readAloud: boolean;
  voiceCommands: boolean;
  onToggleRead: () => void;
  onToggleVoice: () => void;
  onSOS: () => void;
}) {
  return (
    <section className="card wide" aria-label="Settings panel">
      <div className="cardhead static">
        <span>Accessibility Settings</span>
      </div>
      <div className="cardbody">
        <div className="settingRow">
          <label className="settingLabel" htmlFor="readToggle">Read Screen Aloud</label>
          <button
            id="readToggle"
            className={props.readAloud ? "toggle on" : "toggle"}
            aria-pressed={props.readAloud}
            onClick={props.onToggleRead}
          >
            {props.readAloud ? "On" : "Off"}
          </button>
        </div>

        <div className="settingRow">
          <label className="settingLabel" htmlFor="voiceToggle">Voice Commands</label>
          <button
            id="voiceToggle"
            className={props.voiceCommands ? "toggle on" : "toggle"}
            aria-pressed={props.voiceCommands}
            onClick={props.onToggleVoice}
          >
            {props.voiceCommands ? "On" : "Off"}
          </button>
        </div>

        <div className="settingRow">
          <label className="settingLabel" htmlFor="hcToggle">High Contrast</label>
          <button
            id="hcToggle"
            className={"toggle on"}
            aria-pressed={true}
            onClick={() => {}}
          >
            On
          </button>
        </div>

        <div className="settingRow">
          <div className="settingLabel">Text Size</div>
          <div className="pill" aria-label="Text size maximum">Maximum</div>
        </div>

        <div className="actions">
          <button className="secondary" onClick={props.onSOS} aria-label="SOS Emergency">SOS</button>
        </div>
      </div>
    </section>
  );
}

export function StatusBar(props: { lastSync: string }) {
  return (
    <footer className="statusbar" aria-label="Status Bar">
      <div>Logged in as: Patient</div>
      <div>Last sync: {props.lastSync}</div>
      <div>High Contrast Enabled</div>
    </footer>
  );
}