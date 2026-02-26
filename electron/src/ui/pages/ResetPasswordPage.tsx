import React, { useState } from "react";
import { HeaderRow } from "../components/uiPieces";

type Props = {
  onSend: () => void;
  onBack: () => void;
  onSOS: () => void;
};

export default function ResetPasswordPage(props: Props) {
  const [email, setEmail] = useState("patient@example.com");

  return (
    <>
      <HeaderRow title="Reset Your Password" onSOS={props.onSOS} />

      <section className="card wide" aria-label="Reset password">
        <div className="cardhead static">
          <span>Password Reset</span>
        </div>
        <div className="cardbody">
          <div className="settingRow">
            <label className="settingLabel" htmlFor="email">Email</label>
            <input id="email" className="input" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>

          <div className="actions">
            <button className="primary" onClick={props.onSend} aria-label="Send reset link">
              Send Reset Link
            </button>
            <button className="secondary" onClick={props.onBack} aria-label="Back to login">
              Back
            </button>
          </div>
        </div>
      </section>
    </>
  );
}