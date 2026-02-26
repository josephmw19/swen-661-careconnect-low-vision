import React, { useEffect, useId, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

type Props = {
  onCreate: () => void;
  onBackToLogin: () => void;
  onSOS: () => void; // kept for App.tsx compatibility, not used (no accessibility options here)
};

export default function CreateAccountPage(props: Props) {
  const navigate = useNavigate();

  const nameId = useId();
  const emailId = useId();
  const passId = useId();
  const confirmId = useId();

  const nameRef = useRef<HTMLInputElement | null>(null);

  const [fullName, setFullName] = useState("John Smith");
  const [email, setEmail] = useState("your.email@example.com");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [agree, setAgree] = useState(false);

  useEffect(() => {
    nameRef.current?.focus();
  }, []);

  const hasMinLen = password.length >= 8;
  const hasUpper = /[A-Z]/.test(password);
  const hasLower = /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);

  const passwordsMatch = password.length > 0 && password === confirm;

  const canCreate =
    fullName.trim().length >= 2 &&
    email.trim().length > 3 &&
    email.includes("@") &&
    hasMinLen &&
    hasUpper &&
    hasLower &&
    hasNumber &&
    passwordsMatch &&
    agree;

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canCreate) return;
    props.onCreate();
  }

  const onBack = () => {
    try {
      props.onBackToLogin();
    } catch {
      navigate("/login");
    }
  };

  return (
    <section className="authShell" aria-label="Create account page">
      {/* Brand */}
      <div className="authBrand" aria-label="CareConnect brand">
        <div className="authLogo" aria-hidden="true">
          ❤
        </div>
        <div className="authBrandName">CareConnect</div>
      </div>

      {/* Card */}
      <div className="authCard" role="region" aria-label="Create account form">
        {/* Back button INSIDE the card */}
        <button
          type="button"
          className="roleContinue"
          onClick={onBack}
          aria-label="Go back to login"
          style={{ justifySelf: "flex-start", minWidth: 0, width: "auto" }}
        >
          ← Back
        </button>

        <h1 className="authTitle" style={{ marginTop: 10 }}>
          Create Your Account
        </h1>
        <p className="authSub">
          Get started with CareConnect to securely manage your healthcare information.
        </p>

        <form className="authForm" onSubmit={onSubmit}>
          <div className="authField">
            <label className="authLabel" htmlFor={nameId}>
              Full Name
            </label>
            <input
              ref={nameRef}
              id={nameId}
              className="authInput"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="John Smith"
              aria-required="true"
              autoComplete="name"
            />
          </div>

          <div className="authField">
            <label className="authLabel" htmlFor={emailId}>
              Email Address
            </label>
            <input
              id={emailId}
              className="authInput"
              type="email"
              inputMode="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your.email@example.com"
              aria-required="true"
            />
          </div>

          <div className="authField">
            <label className="authLabel" htmlFor={passId}>
              Password
            </label>
            <div className="authPassWrap">
              <input
                id={passId}
                className="authInput authPass"
                type={showPass ? "text" : "password"}
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a strong password"
                aria-required="true"
              />
              <button
                type="button"
                className="authEye"
                aria-label={showPass ? "Hide password" : "Show password"}
                aria-pressed={showPass}
                onClick={() => setShowPass((v) => !v)}
              >
                {showPass ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {/* Password rules box */}
          <div
            className="listitem"
            role="group"
            aria-label="Password requirements"
            style={{ marginBottom: 0 }}
          >
            <div className="listmeta" style={{ marginTop: 0 }}>
              Password must include:
            </div>
            <ul className="bullets" style={{ marginTop: 8 }}>
              <li aria-label={hasMinLen ? "At least 8 characters, met" : "At least 8 characters, not met"}>
                {hasMinLen ? "✓" : "•"} At least 8 characters
              </li>
              <li aria-label={hasUpper ? "One uppercase letter, met" : "One uppercase letter, not met"}>
                {hasUpper ? "✓" : "•"} One uppercase letter
              </li>
              <li aria-label={hasLower ? "One lowercase letter, met" : "One lowercase letter, not met"}>
                {hasLower ? "✓" : "•"} One lowercase letter
              </li>
              <li aria-label={hasNumber ? "One number, met" : "One number, not met"}>
                {hasNumber ? "✓" : "•"} One number
              </li>
            </ul>
          </div>

          <div className="authField">
            <label className="authLabel" htmlFor={confirmId}>
              Confirm Password
            </label>
            <div className="authPassWrap">
              <input
                id={confirmId}
                className="authInput authPass"
                type={showConfirm ? "text" : "password"}
                autoComplete="new-password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                placeholder="Re-enter your password"
                aria-required="true"
                aria-invalid={confirm.length > 0 && !passwordsMatch ? "true" : "false"}
              />
              <button
                type="button"
                className="authEye"
                aria-label={showConfirm ? "Hide confirm password" : "Show confirm password"}
                aria-pressed={showConfirm}
                onClick={() => setShowConfirm((v) => !v)}
              >
                {showConfirm ? "Hide" : "Show"}
              </button>
            </div>
            {confirm.length > 0 && !passwordsMatch && (
              <div className="authMuted" style={{ textAlign: "left" }}>
                Passwords do not match.
              </div>
            )}
          </div>

          <label
            className="authMuted"
            style={{
              display: "flex",
              gap: 10,
              alignItems: "flex-start",
              cursor: "pointer",
              textAlign: "left",
            }}
          >
            <input
              type="checkbox"
              checked={agree}
              onChange={(e) => setAgree(e.target.checked)}
              aria-label="Agree to the terms of service and privacy policy"
              style={{ marginTop: 3 }}
            />
            <span>
              I agree to the{" "}
              <span className="linklike">Terms of Service</span> and{" "}
              <span className="linklike">Privacy Policy</span>
            </span>
          </label>

          <button
            type="submit"
            className="authPrimaryBtn"
            disabled={!canCreate}
            aria-disabled={!canCreate}
          >
            <span>Create Account</span>
            <span aria-hidden="true" className="authArrow">
              →
            </span>
          </button>

          <div className="authDivider" role="separator" aria-hidden="true" />

          <div className="authFoot">
            <div className="authMuted">Already have an account?</div>
            <button type="button" className="authLinkBtn strong" onClick={props.onBackToLogin}>
              Sign in
            </button>
          </div>

          {/* No Accessibility Options button here */}
        </form>
      </div>
    </section>
  );
}