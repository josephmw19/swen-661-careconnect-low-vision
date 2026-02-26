import React from "react";
import { cc } from "../cc";
import {
  HeaderRow,
  MedicationsList
} from "../components/uiPieces";

type Props = {
  onSOS: () => void;
};

export default function MedicationsPage(props: Props) {
  return (
    <>
      <HeaderRow title="Medications" onSOS={props.onSOS} />
      <div className="grid">
        <MedicationsList />
      </div>
    </>
  );
}