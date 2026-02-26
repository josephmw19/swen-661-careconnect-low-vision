import React from "react";
import { cc } from "../cc";
import {
  HeaderRow,
  CriticalMedicalInfo,
  MedicationsList
} from "../components/uiPieces";

type Props = {
  criticalOpen: boolean;
  onToggleCritical: () => void;
  onSOS: () => void;
};

export default function MedicationsPage(props: Props) {
  return (
    <>
      <HeaderRow title="Medications" onSOS={props.onSOS} />
      <div className="grid">
        <CriticalMedicalInfo open={props.criticalOpen} onToggle={props.onToggleCritical} />
        <MedicationsList />
      </div>
    </>
  );
}