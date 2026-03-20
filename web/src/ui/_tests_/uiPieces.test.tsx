import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, Routes, Route, useLocation } from "react-router-dom";

import {
  QuickActionsBar,
  Sidebar,
  HeaderRow,
  CriticalMedicalInfo,
  TaskItem,
  NextMedication,
  Alerts,
  MedicationsList,
  SettingsPanel,
  StatusBar,
} from "../components/uiPieces";

function LocationProbe() {
  const loc = useLocation();
  return <div data-testid="location">{loc.pathname}</div>;
}

describe("uiPieces.tsx", () => {
  describe("QuickActionsBar", () => {
    test("renders buttons, reflects pressed state, and calls handlers", () => {
      const onToggleRead = jest.fn();
      const onToggleVoice = jest.fn();
      const onRefresh = jest.fn();
      const onOpenSettings = jest.fn();

      render(
        <QuickActionsBar
          readAloud={true}
          voiceCommands={false}
          onToggleRead={onToggleRead}
          onToggleVoice={onToggleVoice}
          onRefresh={onRefresh}
          onOpenSettings={onOpenSettings}
        />
      );

      const readBtn = screen.getByRole("button", { name: /toggle read aloud/i });
      const voiceBtn = screen.getByRole("button", { name: /toggle voice commands/i });
      const refreshBtn = screen.getByRole("button", { name: /refresh/i });
      const settingsBtn = screen.getByRole("button", { name: /open settings/i });

      expect(readBtn).toHaveAttribute("aria-pressed", "true");
      expect(voiceBtn).toHaveAttribute("aria-pressed", "false");

      fireEvent.click(readBtn);
      fireEvent.click(voiceBtn);
      fireEvent.click(refreshBtn);
      fireEvent.click(settingsBtn);

      expect(onToggleRead).toHaveBeenCalledTimes(1);
      expect(onToggleVoice).toHaveBeenCalledTimes(1);
      expect(onRefresh).toHaveBeenCalledTimes(1);
      expect(onOpenSettings).toHaveBeenCalledTimes(1);
    });
  });

  describe("Sidebar", () => {
    test("highlights active route and calls onNavigate", () => {
      const onNavigate = jest.fn();
      const sidebarRef = React.createRef<HTMLElement>();

      render(
        <Sidebar activePath="/tasks" onNavigate={onNavigate} sidebarRef={sidebarRef} />
      );

      const tasksBtn = screen.getByRole("button", { name: /tasks/i });
      const homeBtn = screen.getByRole("button", { name: /home/i });

      expect(tasksBtn).toHaveAttribute("aria-current", "page");
      expect(homeBtn).not.toHaveAttribute("aria-current");

      fireEvent.click(homeBtn);
      expect(onNavigate).toHaveBeenCalledWith("/");
    });
  });

  describe("HeaderRow", () => {
    test("renders title and triggers SOS", () => {
      const onSOS = jest.fn();
      render(<HeaderRow title="Dashboard" onSOS={onSOS} />);

      expect(screen.getByRole("heading", { name: /dashboard/i })).toBeInTheDocument();
      fireEvent.click(screen.getByRole("button", { name: /sos emergency/i }));
      expect(onSOS).toHaveBeenCalledTimes(1);
    });
  });

  describe("CriticalMedicalInfo", () => {
    test("closed state renders header only with aria-expanded=false", () => {
      const onToggle = jest.fn();
      render(<CriticalMedicalInfo open={false} onToggle={onToggle} />);

      const toggleBtn = screen.getByRole("button", {
        name: /critical medical information/i,
      });

      expect(toggleBtn).toHaveAttribute("aria-expanded", "false");
      expect(screen.queryByText(/for first responders/i)).not.toBeInTheDocument();

      fireEvent.click(toggleBtn);
      expect(onToggle).toHaveBeenCalledTimes(1);
    });

    test("open state renders content and lists", () => {
      const onToggle = jest.fn();
      render(<CriticalMedicalInfo open={true} onToggle={onToggle} />);

      const toggleBtn = screen.getByRole("button", {
        name: /critical medical information/i,
      });
      expect(toggleBtn).toHaveAttribute("aria-expanded", "true");

      expect(screen.getByText(/for first responders/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/allergies list/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/medical conditions list/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/emergency contact information/i)).toBeInTheDocument();
    });
  });

  describe("TaskItem", () => {
    test("exposes an accessible aria-label including title and status", () => {
      render(<TaskItem title="Take meds" status="Completed" />);
      expect(screen.getByLabelText(/take meds\. completed/i)).toBeInTheDocument();
    });
  });

  describe("NextMedication", () => {
    test("updates status when Mark as Taken and Snooze clicked", () => {
      render(<NextMedication />);

      expect(screen.getByText(/due in 15 minutes/i)).toBeInTheDocument();

      fireEvent.click(screen.getByRole("button", { name: /mark as taken/i }));
      expect(screen.getByText(/taken just now/i)).toBeInTheDocument();

      fireEvent.click(screen.getByRole("button", { name: /snooze 10 minutes/i }));
      expect(screen.getByText(/snoozed 10 minutes/i)).toBeInTheDocument();
    });
  });

  describe("Alerts", () => {
    test("renders alert items with accessible labels", () => {
      render(<Alerts />);
      expect(screen.getByLabelText(/refill due in 3 days/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/upcoming appointment/i)).toBeInTheDocument();
    });
  });

  describe("MedicationsList", () => {
    test("clicking a row navigates to medication details", () => {
      render(
        <MemoryRouter initialEntries={["/medications"]}>
          <Routes>
            <Route
              path="/medications"
              element={
                <>
                  <LocationProbe />
                  <MedicationsList />
                </>
              }
            />
            <Route path="/medications/:medId" element={<LocationProbe />} />
          </Routes>
        </MemoryRouter>
      );

      expect(screen.getByTestId("location").textContent).toBe("/medications");

      // Click on a row by clicking its name text (bubbles to row onClick)
      fireEvent.click(screen.getByText(/lisinopril 10mg/i));

      expect(screen.getByTestId("location").textContent).toBe("/medications/m1");
    });

    test("Mark as Taken updates status and does NOT navigate", () => {
      render(
        <MemoryRouter initialEntries={["/medications"]}>
          <Routes>
            <Route
              path="/medications"
              element={
                <>
                  <LocationProbe />
                  <MedicationsList />
                </>
              }
            />
            <Route path="/medications/:medId" element={<LocationProbe />} />
          </Routes>
        </MemoryRouter>
      );

      expect(screen.getByTestId("location").textContent).toBe("/medications");

      const markBtn = screen.getByRole("button", { name: /mark lisinopril 10mg as taken/i });
      fireEvent.click(markBtn);

      // Should remain on /medications because handler stops propagation
      expect(screen.getByTestId("location").textContent).toBe("/medications");

      // Status should update
      expect(screen.getByText(/taken just now/i)).toBeInTheDocument();
    });

    test("Snooze updates status with deterministic time and does NOT navigate", () => {
      jest.useFakeTimers();
      jest.setSystemTime(new Date("2026-03-01T12:00:00.000Z"));

      render(
        <MemoryRouter initialEntries={["/medications"]}>
          <Routes>
            <Route
              path="/medications"
              element={
                <>
                  <LocationProbe />
                  <MedicationsList />
                </>
              }
            />
            <Route path="/medications/:medId" element={<LocationProbe />} />
          </Routes>
        </MemoryRouter>
      );

      const snoozeBtn = screen.getByRole("button", {
        name: /snooze lisinopril 10mg for 10 minutes/i,
      });
      fireEvent.click(snoozeBtn);

      expect(screen.getByTestId("location").textContent).toBe("/medications");
      expect(screen.getByText(/snoozed until/i)).toBeInTheDocument();

      jest.useRealTimers();
    });

    test("View Details navigates and does not trigger double navigation side effects", () => {
      render(
        <MemoryRouter initialEntries={["/medications"]}>
          <Routes>
            <Route
              path="/medications"
              element={
                <>
                  <LocationProbe />
                  <MedicationsList />
                </>
              }
            />
            <Route path="/medications/:medId" element={<LocationProbe />} />
          </Routes>
        </MemoryRouter>
      );

      const viewBtn = screen.getByRole("button", { name: /view details for lisinopril 10mg/i });
      fireEvent.click(viewBtn);

      expect(screen.getByTestId("location").textContent).toBe("/medications/m1");
    });
  });

  describe("SettingsPanel", () => {
    test("toggles call handlers and SOS works", () => {
      const onToggleRead = jest.fn();
      const onToggleVoice = jest.fn();
      const onSOS = jest.fn();

      render(
        <SettingsPanel
          readAloud={false}
          voiceCommands={true}
          onToggleRead={onToggleRead}
          onToggleVoice={onToggleVoice}
          onSOS={onSOS}
        />
      );

      const readToggle = screen.getByRole("button", { name: /read screen aloud/i });
      const voiceToggle = screen.getByRole("button", { name: /voice commands/i });

      expect(readToggle).toHaveAttribute("aria-pressed", "false");
      expect(voiceToggle).toHaveAttribute("aria-pressed", "true");

      fireEvent.click(readToggle);
      fireEvent.click(voiceToggle);
      fireEvent.click(screen.getByRole("button", { name: /sos emergency/i }));

      expect(onToggleRead).toHaveBeenCalledTimes(1);
      expect(onToggleVoice).toHaveBeenCalledTimes(1);
      expect(onSOS).toHaveBeenCalledTimes(1);
    });
  });

  describe("StatusBar", () => {
    test("renders last sync and static text", () => {
      render(<StatusBar lastSync="2:34 PM" />);
      expect(screen.getByText(/last sync:\s*2:34 pm/i)).toBeInTheDocument();
      expect(screen.getByText(/high contrast enabled/i)).toBeInTheDocument();
    });
  });
});