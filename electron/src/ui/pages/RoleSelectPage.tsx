import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

type Role = "patient" | "caregiver";

export default function RoleSelectPage() {
  const navigate = useNavigate();
  const [role, setRole] = useState<Role>("patient");

  const onContinue = () => {
    // Store for later use, optional but helpful
    try {
      localStorage.setItem("cc_role", role);
    } catch {}
    navigate("/login");
  };

  return (
    <div className="authShell">
      <div className="authCard">
        <h1 className="authTitle">Select Your Role</h1>
        <p className="authSub">
          Choose how you&apos;ll be using CareConnect. This will customize your
          experience and show you the most relevant features.
        </p>

        <div className="roleGrid" role="radiogroup" aria-label="Select role">
          <button
            type="button"
            className={role === "patient" ? "roleCard selected" : "roleCard"}
            onClick={() => setRole("patient")}
            aria-pressed={role === "patient"}
          >
            <div className="roleIcon" aria-hidden="true">
              👤
            </div>
            <div className="roleName">Patient</div>
            <div className="roleDesc">
              For managing my medications and care tasks, and tracking my
              personal health.
            </div>
          </button>

          <button
            type="button"
            className={role === "caregiver" ? "roleCard selected" : "roleCard"}
            onClick={() => setRole("caregiver")}
            aria-pressed={role === "caregiver"}
          >
            <div className="roleIcon" aria-hidden="true">
              👥
            </div>
            <div className="roleName">Caregiver</div>
            <div className="roleDesc">
              For helping someone else manage their health, tasks, and important
              information.
            </div>
          </button>
        </div>

        <div className="roleActions">
          <button
            type="button"
            className="roleContinue"
            onClick={onContinue}
            aria-label="Continue to login"
          >
            Continue <span aria-hidden="true" className="arrow">→</span>
          </button>
        </div>

        <div className="roleFootnote">
          You can change your role at any time in Settings
        </div>

        <button
          type="button"
          className="roleLink"
          onClick={() => navigate("/settings")}
          aria-label="Open accessibility settings"
        >
          ♿ Accessibility Settings
        </button>
      </div>
    </div>
  );
}