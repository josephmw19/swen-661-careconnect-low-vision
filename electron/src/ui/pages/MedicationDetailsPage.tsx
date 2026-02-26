import React from "react";
import { HeaderRow } from "../components/uiPieces";

type Props = {
  medicationName: string;
  onBack: () => void;
  onSOS: () => void;
};

export default function MedicationDetailsPage(props: Props) {
  return (
    <>
      <HeaderRow title="Medication Details" onSOS={props.onSOS} />

      <section className="card wide" aria-label="Medication details">
        <div className="cardhead static">
          <span>{props.medicationName}</span>
        </div>
        <div className="cardbody">
          <div className="infoBlock">
            <div className="label">Dose</div>
            <div className="value">10mg</div>
          </div>
          <div className="infoBlock">
            <div className="label">Instructions</div>
            <div className="value">Take 1 tablet by mouth once daily</div>
          </div>

          <div className="actions">
            <button className="secondary" onClick={props.onBack} aria-label="Back to medications">
              Back
            </button>
            <button className="primary" aria-label="Mark medication taken">
              Mark as Taken
            </button>
          </div>
        </div>
      </section>
    </>
  );
}