import React, { useState } from "react";
import { HeaderRow } from "../components/uiPieces";

type Props = {
  onCreate: () => void;
  onBackToLogin: () => void;
  onSOS: () => void;
};

export default function CreateAccountPage(props: Props) {
  const [name, setName] = useState("Sarah Doe");
  const [email, setEmail] = useState("sarah@example.com");

  return (
    <>
      <HeaderRow title="Create an Account" onSOS={props.onSOS} />

      <section className="card wide" aria-label="Create account">
        <div className="cardhead static">
          <span>New Account</span>
        </div>
        <div className="cardbody">
          <div className="settingRow">
            <label className="settingLabel" htmlFor="name">Full Name</label>
            <input id="name" className="input" value={name} onChange={(e) => setName(e.target.value)} />
          </div>

          <div className="settingRow">
            <label className="settingLabel" htmlFor="email">Email</label>
            <input id="email" className="input" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>

          <div className="actions">
            <button className="primary" onClick={props.onCreate} aria-label="Create account">
              Create Account
            </button>
            <button className="secondary" onClick={props.onBackToLogin} aria-label="Back to login">
              Back
            </button>
          </div>
        </div>
      </section>
    </>
  );
}