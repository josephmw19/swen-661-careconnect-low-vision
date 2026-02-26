import React from "react";
import { HeaderRow } from "../components/uiPieces";

type Props = {
  onStart: () => void;
  onSOS: () => void;
};

export default function LandingPage(props: Props) {
  return (
    <>
      <HeaderRow title="CareConnect" onSOS={props.onSOS} />

      <section className="card wide" aria-label="Landing">
        <div className="cardhead static">
          <span>Welcome</span>
        </div>
        <div className="cardbody">
          <p className="helper-text">
            A low-vision friendly desktop app for patients and caregivers.
          </p>

          <div className="actions">
            <button className="primary" onClick={props.onStart} aria-label="Get started">
              Get Started
            </button>
          </div>
        </div>
      </section>
    </>
  );
}