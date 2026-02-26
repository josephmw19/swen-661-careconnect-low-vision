import React from "react";
import { HeaderRow} from "../components/uiPieces";

type Props = {
  onSOS: () => void;
};

export default function AppointmentsPage(props: Props) {
  return (
    <>
      <HeaderRow title="Appointments" onSOS={props.onSOS} />
      
      <div className="grid">
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