import ScrollToTop from "./components/ScrollToTop";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { cc } from "./cc";
import { Sidebar, StatusBar } from "./components/uiPieces";
import DashboardPage from "./pages/DashboardPage";
import MedicationsPage from "./pages/MedicationsPage";
import SettingsPage from "./pages/SettingsPage";
import LandingPage from "./pages/LandingPage";
import RoleSelectPage from "./pages/RoleSelectPage";
import LoginPage from "./pages/LoginPage";
import CreateAccountPage from "./pages/CreateAccountPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import MedicationDetailsPage from "./pages/MedicationDetailsPage";
import TasksPage from "./pages/TasksPage";
import TaskDetailsPage from "./pages/TaskDetailsPage";
import AppointmentsPage from "./pages/AppointmentsPage";
import AppointmentDetailsPage from "./pages/AppointmentDetailsPage";

type Command =
  | { type: "refresh" }
  | { type: "toggleCritical" }
  | { type: "toggleReadAloud" }
  | { type: "toggleVoice" }
  | { type: "focusSidebar" }
  | { type: "skipToMain" }
  | { type: "about" }
  | { type: "sos" };

export default function App() {
  const [highContrast] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  // ✅ FIX 1: define isAuthRoute
  const isAuthRoute = useMemo(() => {
    const p = location.pathname;
    return (
      p === "/landing" ||
      p === "/role" ||
      p === "/login" ||
      p === "/create-account" ||
      p === "/reset-password"
    );
  }, [location.pathname]);

  const [criticalOpen, setCriticalOpen] = useState(true);
  const [readAloud, setReadAloud] = useState(false);
  const [voiceCommands, setVoiceCommands] = useState(false);

  const sidebarRef = useRef<HTMLElement | null>(null);
  const mainRef = useRef<HTMLElement | null>(null);

  const lastSync = useMemo(() => "2:34 PM", []);

  const sos = async () => cc().showNativeDialog("SOS triggered (demo).");

  useEffect(() => {
    // Handle native menu navigation + commands via preload API
    const api = cc();

    const offNav = api.onNavigate((path: string) => {
      navigate(path);
    });

    const offCmd = api.onCommand(async (cmd: Command) => {
      switch (cmd.type) {
        case "refresh":
          // Refresh is handled by main process via webContents.reload()
          break;
        case "toggleCritical":
          setCriticalOpen((v) => !v);
          break;
        case "toggleReadAloud":
          setReadAloud((v) => !v);
          break;
        case "toggleVoice":
          setVoiceCommands((v) => !v);
          break;
        case "focusSidebar":
          sidebarRef.current
            ?.querySelector<HTMLElement>("[data-focus-start='sidebar']")
            ?.focus();
          break;
        case "skipToMain":
          mainRef.current?.focus();
          break;
        case "about":
          await api.showNativeDialog(
            "CareConnect Desktop (Week 7)\nElectron + React scaffold with native menus, shortcuts, navigation, and IPC."
          );
          break;
        case "sos":
          await api.showNativeDialog("SOS triggered (demo).");
          break;
      }
    });

    return () => {
      offNav?.();
      offCmd?.();
    };
  }, [navigate]);

  return (
    <div
      className={highContrast ? "app hc" : "app"}
      aria-label="CareConnect Desktop Application"
    >
      <ScrollToTop containerRef={mainRef} />

      {/* Skip link for keyboard-only users */}
      <a className="skip-link" href="#main">
        Skip to main content
      </a>

      <div className="body">
        {!isAuthRoute && (
          <Sidebar
            activePath={location.pathname}
            onNavigate={(path) => navigate(path)}
            sidebarRef={sidebarRef}
          />
        )}

        <main
          id="main"
          ref={(el) => {
            mainRef.current = el;
          }}
          tabIndex={-1}
          className={isAuthRoute ? "main authMain" : "main"}
          aria-label="Main Content"
        >
          <Routes>
            {/* Auth flow */}
            <Route path="/landing" element={<LandingPage />} />
            <Route path="/role" element={<RoleSelectPage />} />

            {/* ✅ FIX 2: pass required props */}
            <Route
              path="/login"
              element={
                <LoginPage
                  onLogin={() => navigate("/")}
                  onGoCreate={() => navigate("/create-account")}
                  onGoReset={() => navigate("/reset-password")}
                  onSOS={sos}
                />
              }
            />
            <Route
              path="/create-account"
              element={
                <CreateAccountPage
                  onCreate={() => navigate("/")}
                  onBackToLogin={() => navigate("/login")}
                  onSOS={sos}
                />
              }
            />
            <Route
              path="/reset-password"
              element={
                <ResetPasswordPage
                  onSend={() => navigate("/login")}
                  onBack={() => navigate("/login")}
                  onSOS={sos}
                />
              }
            />

            {/* Main app */}
            <Route
              path="/"
              element={
                <DashboardPage
                  criticalOpen={criticalOpen}
                  onToggleCritical={() => setCriticalOpen((v) => !v)}
                  onSOS={sos}
                />
              }
            />

            <Route path="/medications" element={<MedicationsPage onSOS={sos} />} />
            <Route path="/medications/:medId" element={<MedicationDetailsPage onSOS={sos} />} />

            <Route
              path="/settings"
              element={
                <SettingsPage
                  readAloud={readAloud}
                  voiceCommands={voiceCommands}
                  onToggleRead={() => setReadAloud((v) => !v)}
                  onToggleVoice={() => setVoiceCommands((v) => !v)}
                  onSOS={sos}
                />
              }
            />

            <Route path="/appointments" element={<AppointmentsPage onSOS={sos} />} />
            <Route path="/appointments/:appointmentId" element={<AppointmentDetailsPage onSOS={sos} />} />

            <Route path="/tasks" element={<TasksPage onSOS={sos} />} />
            <Route path="/tasks/:taskId" element={<TaskDetailsPage onSOS={sos} />} />

            <Route
              path="*"
              element={
                <>
                  <div className="headerrow">
                    <h1 className="title">Not Found</h1>
                    <button className="sos" aria-label="SOS Emergency" onClick={sos}>
                      SOS
                    </button>
                  </div>

                  <div className="card wide" style={{ padding: 16 }}>
                    <p>Page not found.</p>
                  </div>
                </>
              }
            />
          </Routes>
        </main>
      </div>

      {!isAuthRoute && <StatusBar lastSync={lastSync} />}
    </div>
  );
}