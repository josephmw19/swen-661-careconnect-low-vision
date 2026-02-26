import React from "react";
import { cc } from "../cc";
import { HeaderRow, SettingsPanel } from "../components/uiPieces";

type Props = {
  readAloud: boolean;
  voiceCommands: boolean;
  onToggleRead: () => void;
  onToggleVoice: () => void;
  onSOS: () => void;
};

export default function SettingsPage(props: Props) {
  return (
    <>
      <HeaderRow title="Settings" onSOS={props.onSOS} />
      <SettingsPanel
        readAloud={props.readAloud}
        voiceCommands={props.voiceCommands}
        onToggleRead={props.onToggleRead}
        onToggleVoice={props.onToggleVoice}
        onSOS={props.onSOS}
      />
    </>
  );
}