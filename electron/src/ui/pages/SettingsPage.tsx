import React, { useMemo, useState } from "react";
import { HeaderRow } from "../components/uiPieces";
import { useNavigate } from "react-router-dom";

type Props = {
  readAloud: boolean;
  voiceCommands: boolean;
  onToggleRead: () => void;
  onToggleVoice: () => void;
  onSOS: () => void;
};

function Segmented(props: {
  label: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
}) {
  const { label, options, value, onChange } = props;

  return (
    <div className="setRow">
      <div className="setLeft">
        <div className="setLabel">{label}</div>
      </div>

      <div className="seg" role="group" aria-label={label}>
        {options.map((o) => (
          <button
            key={o}
            type="button"
            className={o === value ? "segBtn active" : "segBtn"}
            aria-pressed={o === value}
            onClick={() => onChange(o)}
          >
            {o}
          </button>
        ))}
      </div>
    </div>
  );
}

function ToggleRow(props: {
  title: string;
  desc?: string;
  value: boolean;
  onToggle: () => void;
  onLabel?: string;
  offLabel?: string;
}) {
  const onLabel = props.onLabel ?? "On";
  const offLabel = props.offLabel ?? "Off";

  return (
    <div className="setRow">
      <div className="setLeft">
        <div className="setLabel">{props.title}</div>
        {props.desc ? <div className="setDesc">{props.desc}</div> : null}
      </div>

      <button
        type="button"
        className={props.value ? "setToggle on" : "setToggle"}
        aria-pressed={props.value}
        onClick={props.onToggle}
      >
        {props.value ? onLabel : offLabel}
      </button>
    </div>
  );
}

export default function SettingsPage(props: Props) {
  const navigate = useNavigate();

  const [textSize, setTextSize] = useState<"Large" | "Extra Large" | "Maximum">("Large");
  const [lineSpacing, setLineSpacing] = useState<"Normal" | "Relaxed" | "Maximum">("Normal");
  const [density, setDensity] = useState<"Slow" | "Normal" | "Fast">("Normal");

  const [highContrast, setHighContrast] = useState(true);
  const [dyslexicFont, setDyslexicFont] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(true);

  const [screenReaderHints, setScreenReaderHints] = useState(true);
  const [voiceNavigation, setVoiceNavigation] = useState(false);
  const [voiceFeedback, setVoiceFeedback] = useState(true);

  const [tabNav, setTabNav] = useState(true);
  const [stickyKeys, setStickyKeys] = useState(false);

  const subtitle = useMemo(
    () => "Adjust display, interaction, and accessibility preferences.",
    []
  );

  return (
    <div className="settingsWrap">
      <HeaderRow title="Settings" onSOS={props.onSOS} />
      <div className="settingsSubtitle">{subtitle}</div>

      {/* Vision & Display */}
      <section className="card wide settingsCard" aria-label="Vision and display settings">
        <div className="settingsCardHead">
          <div className="settingsCardTitle">Vision &amp; Display</div>
        </div>

        <div className="settingsCardBody">
          <Segmented
            label="Text Size"
            options={["Large", "Extra Large", "Maximum"]}
            value={textSize}
            onChange={(v) => setTextSize(v as any)}
          />

          <Segmented
            label="Line Spacing"
            options={["Normal", "Relaxed", "Maximum"]}
            value={lineSpacing}
            onChange={(v) => setLineSpacing(v as any)}
          />

          <Segmented
            label="Interface Density"
            options={["Comfortable", "Balanced", "Compact"]}
            value={"Balanced"}
            onChange={() => {}}
          />

          <ToggleRow
            title="High-Contrast Mode"
            desc="Increase visibility with stronger color contrast."
            value={highContrast}
            onToggle={() => setHighContrast((v) => !v)}
            onLabel="On"
            offLabel="Off"
          />

          <ToggleRow
            title="Dyslexic Font"
            desc="Makes text easier to read for some users."
            value={dyslexicFont}
            onToggle={() => setDyslexicFont((v) => !v)}
            onLabel="On"
            offLabel="Off"
          />

          <ToggleRow
            title="Reduce Visual Motion"
            desc="Minimize animations to reduce distraction."
            value={reduceMotion}
            onToggle={() => setReduceMotion((v) => !v)}
            onLabel="On"
            offLabel="Off"
          />
        </div>
      </section>

      {/* Read Aloud & Voice */}
      <section className="card wide settingsCard" aria-label="Read aloud and voice settings">
        <div className="settingsCardHead">
          <div className="settingsCardTitle">Read Aloud &amp; Voice Interaction</div>
        </div>

        <div className="settingsCardBody">
          <ToggleRow
            title="Read Screen Aloud"
            desc="Announces key content on screen."
            value={props.readAloud}
            onToggle={props.onToggleRead}
            onLabel="On"
            offLabel="Off"
          />

          <ToggleRow
            title="Voice Commands"
            desc="Use voice to navigate and perform actions."
            value={props.voiceCommands}
            onToggle={props.onToggleVoice}
            onLabel="On"
            offLabel="Off"
          />

          <ToggleRow
            title="Read Navigation Hints"
            desc="Helpful prompts for common actions."
            value={screenReaderHints}
            onToggle={() => setScreenReaderHints((v) => !v)}
            onLabel="On"
            offLabel="Off"
          />

          <ToggleRow
            title="Voice Navigation"
            desc="Hands-free navigation with voice commands."
            value={voiceNavigation}
            onToggle={() => setVoiceNavigation((v) => !v)}
            onLabel="On"
            offLabel="Off"
          />

          <ToggleRow
            title="Voice Feedback for Actions"
            desc="Confirms actions with spoken feedback."
            value={voiceFeedback}
            onToggle={() => setVoiceFeedback((v) => !v)}
            onLabel="On"
            offLabel="Off"
          />

          <Segmented
            label="Speech Speed"
            options={["Slow", "Normal", "Fast"]}
            value={density}
            onChange={(v) => setDensity(v as any)}
          />
        </div>
      </section>

      {/* Keyboard & Navigation */}
      <section className="card wide settingsCard" aria-label="Keyboard and navigation settings">
        <div className="settingsCardHead">
          <div className="settingsCardTitle">Keyboard &amp; Navigation Preferences</div>
        </div>

        <div className="settingsCardBody">
          <ToggleRow
            title="Enable Full Keyboard Navigation"
            desc="Navigate using Tab, Arrow keys, and shortcuts."
            value={tabNav}
            onToggle={() => setTabNav((v) => !v)}
            onLabel="On"
            offLabel="Off"
          />

          <ToggleRow
            title="Sticky Keys"
            desc="Allow modifier keys to be pressed one at a time."
            value={stickyKeys}
            onToggle={() => setStickyKeys((v) => !v)}
            onLabel="Always On"
            offLabel="Off"
          />

          <div className="setRow">
            <div className="setLeft">
              <div className="setLabel">Shortcut Reference</div>
              <div className="setDesc">View keyboard shortcuts.</div>
            </div>

            <button type="button" className="setActionBtn" onClick={props.onSOS}>
              View Shortcut Reference ↗
            </button>
          </div>
        </div>
      </section>

      {/* Account & System */}
      <section className="card wide settingsCard" aria-label="Account and system settings">
        <div className="settingsCardHead">
          <div className="settingsCardTitle">Account &amp; System</div>
        </div>

        <div className="settingsCardBody">
          <button type="button" className="setRowBtn" onClick={props.onSOS}>
            Manage Password
          </button>

          <button type="button" className="setRowBtn" onClick={props.onSOS}>
            Manage Notifications
          </button>

          <button
            type="button"
            className="setSignOut"
            onClick={() => navigate("/landing")}
            aria-label="Sign out"
          >
            Sign Out
          </button>
        </div>
      </section>
    </div>
  );
}