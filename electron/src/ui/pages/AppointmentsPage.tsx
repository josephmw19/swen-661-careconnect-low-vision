import React from "react";
import { HeaderRow, CriticalMedicalInfo } from "../components/uiPieces";

type Props = {
  criticalOpen: boolean;
  onToggleCritical: () => void;
  onSOS: () => void;
};

export default function AppointmentsPage(props: Props) {
  return (
    <>
      <HeaderRow title="Appointments" onSOS={props.onSOS} />
      <div className="grid">
        <CriticalMedicalInfo open={props.criticalOpen} onToggle={props.onToggleCritical} />

        <section className="card wide" aria-label="Appointments list">
          <div className="cardhead static">
            <span>Upcoming Appointments</span>
          </div>
          <div className="cardbody">
            <div className="listitem" tabIndex={0}>
              <div className="listtitle">Dr. Smith</div>
              <div className="listmeta">Tomorrow, 2:00 PM, Primary Care</div>
            </div>

            <div className="listitem" tabIndex={0}>
              <div className="listtitle">Lab Work</div>
              <div className="listmeta">Friday, 9:00 AM</div>
            </div>

            <div className="actions">
              <button className="secondary" aria-label="View appointment details">
                View Details
              </button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}