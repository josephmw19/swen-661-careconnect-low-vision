import React, { useState } from "react";
import { HeaderRow } from "../components/uiPieces";

type Props = {
  onLogin: () => void;
  onGoCreate: () => void;
  onGoReset: () => void;
  onSOS: () => void;
};

export default function LoginPage(props: Props) {
  const [email, setEmail] = useState("patient@example.com");
  const [pw, setPw] = useState("••••••••");

  return (
    <>
      <HeaderRow title="Welcome Back" onSOS={props.onSOS} />

      <section className="card wide" aria-label="Login">
        <div className="cardhead static">
          <span>Sign In</span>
        </div>
        <div className="cardbody">
          <div className="settingRow">
            <label className="settingLabel" htmlFor="email">Email</label>
            <input
              id="email"
              className="input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-label="Email"
            />
          </div>

          <div className="settingRow">
            <label className="settingLabel" htmlFor="pw">Password</label>
            <input
              id="pw"
              className="input"
              value={pw}
              onChange={(e) => setPw(e.target.value)}
              aria-label="Password"
            />
          </div>

          <div className="actions">
            <button className="primary" onClick={props.onLogin} aria-label="Sign in">
              Sign In
            </button>
            <button className="secondary" onClick={props.onGoReset} aria-label="Reset password">
              Forgot Password
            </button>
            <button className="secondary" onClick={props.onGoCreate} aria-label="Create account">
              Create Account
            </button>
          </div>
        </div>
      </section>
    </>
  );
}