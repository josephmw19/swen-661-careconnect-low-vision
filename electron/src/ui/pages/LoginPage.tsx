import React, { useEffect, useId, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

type Props = {
  onLogin: () => void;
  onGoCreate: () => void;
  onGoReset: () => void;
  onSOS: () => void;
};

export default function LoginPage(props: Props) {
  const navigate = useNavigate();

  const emailId = useId();
  const passId = useId();
  const emailRef = useRef<HTMLInputElement | null>(null);

  const [email, setEmail] = useState("jane.smith@example.com");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);

  useEffect(() => {
    emailRef.current?.focus();
  }, []);

  const canSubmit = email.trim().length > 3 && password.trim().length > 0;

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;
    props.onLogin();
  }

  return (
    <section className="authShell" aria-label="Sign in page">
      {/* Back button */}

      {/* Brand */}
      <div className="authBrand" aria-label="CareConnect brand">
        <div className="authLogo" aria-hidden="true">
          ❤
        </div>
        <div className="authBrandName">CareConnect</div>
      </div>

      {/* Card */}
      <div className="authCard" role="region" aria-label="Welcome back sign in form">
        <div className="detailsTop">
          <button
            type="button"
            className="detailsBack"
            onClick={() => navigate("/role")}
            aria-label="Back to role selection"
          >
            ← Back
          </button>
        </div>

        <h1 className="authTitle">Welcome Back</h1>
        <p className="authSub">Sign in to continue managing your care.</p>

        <form className="authForm" onSubmit={onSubmit}>
          {/* rest of your form unchanged */}
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
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                aria-required="true"
                placeholder="Enter your password"
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

          <button
            type="submit"
            className="authPrimaryBtn"
            disabled={!canSubmit}
            aria-disabled={!canSubmit}
          >
            <span>Sign In</span>
            <span aria-hidden="true" className="authArrow">
              →
            </span>
          </button>

          <button type="button" className="authLinkBtn" onClick={props.onGoReset}>
            Forgot password?
          </button>

          <div className="authDivider" role="separator" aria-hidden="true" />

          <div className="authFoot">
            <div className="authMuted">Don&apos;t have an account?</div>
            <button type="button" className="authLinkBtn strong" onClick={props.onGoCreate}>
              Create an account
            </button>
          </div>

          <button type="button" className="authLinkBtn small" onClick={props.onSOS}>
            Accessibility Options
          </button>
        </form>
      </div>
    </section>
  );
}