import React from "react";
import { HeaderRow } from "../components/uiPieces";

type Props = {
  onSelectPatient: () => void;
  onSelectCaregiver: () => void;
  onSOS: () => void;
};

export default function RoleSelectPage(props: Props) {
  return (
    <>
      <HeaderRow title="Select Your Role" onSOS={props.onSOS} />

      <section className="card wide" aria-label="Role select">
        <div className="cardhead static">
          <span>Choose one</span>
        </div>
        <div className="cardbody">
          <div className="actions">
            <button className="primary" onClick={props.onSelectPatient} aria-label="Select Patient role">
              Patient
            </button>
            <button className="secondary" onClick={props.onSelectCaregiver} aria-label="Select Caregiver role">
              Caregiver
            </button>
          </div>
        </div>
      </section>
    </>
  );
}