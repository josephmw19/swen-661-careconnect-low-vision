import React, { useEffect, useId, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

type Props = {
  onSend: () => void;
  onBack: () => void; // keep this for App.tsx wiring, but we'll also support direct /login nav
  onSOS: () => void;  // kept for compatibility, not used (no accessibility options on this page)
};

export default function ResetPasswordPage(props: Props) {
  const navigate = useNavigate();
  const emailId = useId();
  const emailRef = useRef<HTMLInputElement | null>(null);

  const [email, setEmail] = useState("jane.smith@example.com");

  useEffect(() => {
    emailRef.current?.focus();
  }, []);

  const canSend = email.trim().length > 3 && email.includes("@");

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSend) return;
    props.onSend();
  }

  const onBack = () => {
    // prefer parent handler if provided, but also works standalone
    try {
      props.onBack();
    } catch {
      navigate("/login");
    }
  };

  return (
    <section className="authShell" aria-label="Reset password page">
      {/* Brand */}
      <div className="authBrand" aria-label="CareConnect brand">
        <div className="authLogo" aria-hidden="true">
          ❤
        </div>
        <div className="authBrandName">CareConnect</div>
      </div>

      {/* Card */}
      <div className="authCard" role="region" aria-label="Reset password form">
        {/* Back button INSIDE the card, like Role Select */}
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
          Reset Your Password
        </h1>
        <p className="authSub">
          Enter your email address and we&apos;ll send you a link to reset your password.
        </p>

        <form className="authForm" onSubmit={onSubmit}>
          <div className="authField">
            <label className="authLabel" htmlFor={emailId}>
              Email Address
            </label>
            <input
              ref={emailRef}
              id={emailId}
              className="authInput"
              type="email"
              inputMode="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-required="true"
              placeholder="your.email@example.com"
            />
          </div>

          <button
            type="submit"
            className="authPrimaryBtn"
            disabled={!canSend}
            aria-disabled={!canSend}
          >
            <span>Send Reset Link</span>
            <span aria-hidden="true" className="authArrow">
              →
            </span>
          </button>

          <div className="authMuted" style={{ textAlign: "center" }}>
            For your security, we don&apos;t confirm whether an account exists.
          </div>

          {/* No Accessibility Options button on this page */}
        </form>
      </div>
    </section>
  );
}