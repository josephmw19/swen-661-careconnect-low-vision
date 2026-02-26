import React, { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { HeaderRow } from "../components/uiPieces";

type Props = {
  onSOS: () => void;
};

type HistoryItem = {
  id: string;
  label: string;
  tone: "ok" | "warn" | "info";
};

export default function MedicationDetailsPage(props: Props) {
  const navigate = useNavigate();
  const { medId } = useParams();

  // NEW: local interaction state
  const [taken, setTaken] = useState(false);
  const [snoozedUntil, setSnoozedUntil] = useState<number | null>(null);

  const history = useMemo<HistoryItem[]>(
    () => [
      { id: "h1", label: "Taken today at 8:15 AM", tone: "ok" },
      { id: "h2", label: "Taken yesterday at 7:58 AM", tone: "ok" },
      { id: "h3", label: "Missed dose on Jan 27", tone: "warn" },
      { id: "h4", label: "Taken Jan 26 at 8:06 AM", tone: "ok" },
      { id: "h5", label: "Taken Jan 25 at 8:12 AM", tone: "ok" },
    ],
    []
  );

  // NEW: derived UI labels
  const now = Date.now();
  const isSnoozed = typeof snoozedUntil === "number" && snoozedUntil > now;

  const nextDoseLabel = taken
    ? "Taken • just now"
    : isSnoozed
      ? `Snoozed • until ${new Date(snoozedUntil!).toLocaleTimeString([], {
          hour: "numeric",
          minute: "2-digit",
        })}`
      : "Due at 2:30 PM";

  const statusToneClass = taken ? "medStatusNew ok" : isSnoozed ? "medStatusNew info" : "medStatusNew warn";
  const statusText = taken ? "Taken" : isSnoozed ? "Snoozed" : "Due soon";

  const handleMarkTaken = () => {
    setTaken(true);
    setSnoozedUntil(null);
    window.alert("Marked as taken.");
  };

  const handleSnooze = (minutes = 15) => {
    setTaken(false);
    setSnoozedUntil(Date.now() + minutes * 60 * 1000);
    window.alert(`Snoozed ${minutes} minutes.`);
  };

  return (
    <>
      <HeaderRow title="Medication Details" onSOS={props.onSOS} />

      <div className="detailsTop">
        <button className="detailsBack" onClick={() => navigate("/medications")} aria-label="Back to Medications">
          Back to Medications
        </button>
      </div>

      <p className="detailsSubtitle">Medication • {medId ?? "Metformin 500mg"}</p>

      <div className="medDetailsRow">
        {/* LEFT STACK */}
        <div className="detailsStack">
          {/* Medication Summary */}
          <section className="card detailsCard" aria-label="Medication Summary">
            <div className="detailsCardHead">Medication Summary</div>
            <div className="detailsCardBody">
              <div className="detailsTitle">Metformin 500mg</div>

              <div className="detailsLine"><strong>Dosage:</strong> 1 tablet with breakfast</div>
              <div className="detailsLine"><strong>Schedule:</strong> Twice daily with meals</div>

              <div className="detailsMeta">
                <div className="detailsMetaRow">
                  <span className="detailsMetaDot">●</span>
                  <span><strong>Next Dose:</strong> {nextDoseLabel}</span>
                </div>
                <div className="detailsMetaRow">
                  <span className="detailsMetaDot">●</span>
                  <span className={statusToneClass}>{statusText}</span>
                </div>
              </div>
            </div>
          </section>

          {/* Instructions */}
          <section className="card detailsCard" aria-label="Instructions">
            <div className="detailsCardHead">Instructions</div>
            <div className="detailsCardBody">
              <ul className="detailsBullets" aria-label="Medication instructions list">
                <li>Take with food and water.</li>
                <li>Do not skip doses unless instructed by a provider.</li>
                <li>May cause stomach upset when first starting.</li>
                <li>If you miss a dose, take it as soon as you remember unless it is close to the next dose.</li>
              </ul>
            </div>
          </section>

          {/* History */}
          <section className="card detailsCard" aria-label="History">
            <div className="detailsCardHead">History</div>
            <div className="detailsCardBody">
              <div className="detailsHistory" role="list" aria-label="Medication history list">
                {history.map((h) => (
                  <div key={h.id} className="medHistoryRow" role="listitem">
                    <div
                      className={
                        h.tone === "ok"
                          ? "historyDot ok"
                          : h.tone === "warn"
                            ? "historyDot warn"
                            : "historyDot info"
                      }
                    />
                    <div className="detailsHistoryValue">{h.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>

        {/* RIGHT ACTIONS */}
        <aside className="medActionsCol" aria-label="Actions">
          <section className="card detailsCard">
            <div className="detailsCardHead">Actions</div>
            <div className="detailsCardBody">
              <div className="detailsActions">
                <button
                  className="btnPrimary"
                  aria-label="Mark as Taken"
                  onClick={handleMarkTaken}
                  disabled={taken}
                  title={taken ? "Already taken" : "Mark as taken"}
                >
                  {taken ? "Taken" : "Mark as Taken"}
                </button>

                <button
                  className="btnGhost"
                  aria-label="Snooze 15 minutes"
                  onClick={() => handleSnooze(15)}
                >
                  Snooze 15 minutes
                </button>

                <button
                  className="btnDark"
                  aria-label="Edit Schedule"
                  onClick={() => window.alert("Edit Schedule (demo): not implemented yet.")}
                >
                  Edit Schedule
                </button>

                <button
                  className="btnDark"
                  aria-label="Request Refill"
                  onClick={() => window.alert("Request Refill (demo): not implemented yet.")}
                >
                  Request Refill
                </button>

                <div className="refillNote" aria-label="Refill information">
                  Refill reminder: <strong>Due in 2 days</strong>
                </div>
              </div>
            </div>
          </section>
        </aside>
      </div>
    </>
  );
}