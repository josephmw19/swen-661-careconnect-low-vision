import React from "react";
import { HeaderRow, MedicationsList } from "../components/uiPieces";

type Props = {
  onSOS: () => void;
};

export default function MedicationsPage(props: Props) {
  return (
    <>
      <HeaderRow title="Medications" onSOS={props.onSOS} />

      <div className="pageMain" aria-label="Medications content">
        <div className="sectionTitle">Today&apos;s Medications</div>
        <MedicationsList />
      </div>
    </>
  );
}