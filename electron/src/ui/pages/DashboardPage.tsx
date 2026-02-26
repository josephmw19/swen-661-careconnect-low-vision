import React from "react";
import { cc } from "../cc";
import {
  HeaderRow,
  CriticalMedicalInfo,
  TodaysTasks,
  NextMedication,
  Alerts
} from "../components/uiPieces";

type Props = {
  criticalOpen: boolean;
  onToggleCritical: () => void;
  onSOS: () => void;
};

export default function DashboardPage(props: Props) {
  return (
    <>
      <HeaderRow title="Dashboard" onSOS={props.onSOS} />
      <div className="grid">
        <CriticalMedicalInfo open={props.criticalOpen} onToggle={props.onToggleCritical} />
        <TodaysTasks />
        <NextMedication />
        <Alerts />
      </div>
    </>
  );
}