import React, { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { HeaderRow } from "../components/uiPieces";

type Props = {
  onSOS: () => void;
};

type ApptDetail = {
  id: string;
  provider: string;
  specialty: string;
  reason: string;
  dateTime: string;

  locationName: string;
  addressLine1: string;
  addressLine2: string;
  arrivalNote: string;

  prep: string[];

  history: { label: string; value: string }[];
};

export default function AppointmentDetailsPage(props: Props) {
  const navigate = useNavigate();
  const { appointmentId } = useParams();

  const appt = useMemo<ApptDetail>(() => {
    // Demo data. Later you can map appointmentId to real objects.
    return {
      id: appointmentId || "a1",
      provider: "Dr. Sarah Jefferson",
      specialty: "Primary Care",
      reason: "Annual checkup",
      dateTime: "Monday, February 3 at 2:30 PM",

      locationName: "Main Street Medical Center",
      addressLine1: "123 Main Street, Suite 100",
      addressLine2: "Springfield, VA 22150",
      arrivalNote: "Arrive 15 minutes early",

      prep: [
        "Bring insurance card and photo ID",
        "Bring list of current medications",
        "Bring any recent lab results",
        "Fast for 8 hours before appointment",
      ],

      history: [
        { label: "Scheduled on", value: "Jan 19, 2026" },
        { label: "Last visit", value: "Feb 10, 2025" },
        { label: "Notified and confirmed", value: "Jan 28, 2026" },
      ],
    };
  }, [appointmentId]);

  return (
    <>
      <HeaderRow title="Appointment Details" onSOS={props.onSOS} />

      <div className="detailsTop">
        <button
          className="detailsBack"
          onClick={() => navigate("/appointments")}
          aria-label="Back to appointments"
        >
          Back to Appointments
        </button>
      </div>

      <div className="detailsSubtitle">Review appointment information and actions</div>

      <div className="detailsStack" aria-label="Appointment details content">
        {/* Appointment Summary */}
        <section className="card detailsCard" aria-label="Appointment summary">
          <div className="detailsCardHead">Appointment Summary</div>
          <div className="detailsCardBody">
            <div className="detailsTitle">{appt.provider}</div>
            <div className="detailsLine">{appt.specialty}</div>
            <div className="detailsLine">{appt.reason}</div>

            <div className="detailsMeta">
              <div className="detailsMetaRow">
                <span className="detailsMetaDot" aria-hidden="true">●</span>
                <span>{appt.dateTime}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Location */}
        <section className="card detailsCard" aria-label="Location">
          <div className="detailsCardHead">Location</div>
          <div className="detailsCardBody">
            <div className="detailsTitleSmall">{appt.locationName}</div>
            <div className="detailsLine">{appt.addressLine1}</div>
            <div className="detailsLine">{appt.addressLine2}</div>

            <div className="detailsMeta">
              <div className="detailsMetaRow">
                <span className="detailsMetaDot" aria-hidden="true">●</span>
                <span>{appt.arrivalNote}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Preparation Notes */}
        <section className="card detailsCard" aria-label="Preparation notes">
          <div className="detailsCardHead">Preparation Notes</div>
          <div className="detailsCardBody">
            <ul className="detailsBullets" aria-label="Preparation list">
              {appt.prep.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </div>
        </section>

        {/* Actions */}
        <section className="card detailsCard" aria-label="Actions">
          <div className="detailsCardHead">Actions</div>
          <div className="detailsCardBody">
            <div className="detailsActions">
              <button className="btnBlue" onClick={() => {}} aria-label="Add to calendar">
                Add to Calendar
              </button>
              <button className="btnDark" onClick={() => {}} aria-label="Call office">
                Call Office
              </button>
              <button className="btnDark" onClick={() => {}} aria-label="Set coverage">
                Set Coverage
              </button>
            </div>
          </div>
        </section>

        {/* Appointment History */}
        <section className="card detailsCard" aria-label="Appointment history">
          <div className="detailsCardHead">Appointment History</div>
          <div className="detailsCardBody">
            <div className="detailsHistory">
              {appt.history.map((h) => (
                <div key={h.label} className="detailsHistoryRow">
                  <div className="detailsHistoryLabel">{h.label}</div>
                  <div className="detailsHistoryValue">{h.value}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}