import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { HeaderRow } from "../components/uiPieces";

type Props = {
  onSOS: () => void;
};

type Appt = {
  id: string;
  provider: string;
  type: string;
  when: string;
  note: string;
};

export default function AppointmentsPage(props: Props) {
  const navigate = useNavigate();

  const appts = useMemo<Appt[]>(
    () => [
      {
        id: "a1",
        provider: "Dr. Sarah Johnston",
        type: "Primary Care",
        when: "Friday, February 1 at 2:15 PM",
        note: "Annual checkup",
      },
      {
        id: "a2",
        provider: "Dr. Michael Chen",
        type: "Cardiology Clinic",
        when: "Wednesday, February 6 at 10:00 AM",
        note: "Follow-up visit",
      },
      {
        id: "a3",
        provider: "Dr. Emily Rodriguez",
        type: "Eye Care Center",
        when: "Friday, February 7 at 3:15 PM",
        note: "Test exam",
      },
      {
        id: "a4",
        provider: "Dr. James Williams",
        type: "Physical Therapy",
        when: "Monday, February 10 at 1:15 PM",
        note: "Physical therapy session",
      },
      {
        id: "a5",
        provider: "Dr. Lisa Anderson",
        type: "Dental",
        when: "Tuesday, February 11 at 9:00 AM",
        note: "Checkup/cleaning",
      },
    ],
    []
  );

  return (
    <>
      <HeaderRow title="Appointments" onSOS={props.onSOS} />

      <div className="sectionTitle">Upcoming appointments</div>

      <div className="apptStack" role="list" aria-label="Appointments list">
        {appts.map((a) => (
          <AppointmentRow
            key={a.id}
            appt={a}
            onOpen={() => navigate(`/appointments/${a.id}`)}
          />
        ))}
      </div>
    </>
  );
}

function AppointmentRow(props: { appt: Appt; onOpen: () => void }) {
  const { appt } = props;

  return (
    <div className="apptRow" role="listitem">
      <button className="apptBody" onClick={props.onOpen} aria-label={`Open appointment: ${appt.provider}`}>
        <div className="apptTitle">{appt.provider}</div>
        <div className="apptMeta">
          <div className="apptLine">{appt.type}</div>
          <div className="apptLine">{appt.when}</div>
          <div className="apptLine">{appt.note}</div>
        </div>
      </button>

      <div className="apptActions" aria-label="Appointment actions">
        <button className="apptBtn" onClick={props.onOpen} aria-label={`View details for ${appt.provider}`}>
          View Details ›
        </button>
      </div>
    </div>
  );
}