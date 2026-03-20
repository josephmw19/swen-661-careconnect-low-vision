import React from "react";
import { render, screen, act } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

/**
 * Mock ScrollToTop because jsdom HTMLElement doesn't implement scrollTo().
 * (Your production component is fine in a real browser.)
 */
jest.mock("../components/ScrollToTop", () => {
  const React = require("react");
  return function ScrollToTopMock(_props: any) {
    return <div data-testid="scroll-to-top" />;
  };
});

/**
 * We mock cc() to provide an Electron preload API stub.
 */
type Command =
  | { type: "refresh" }
  | { type: "toggleCritical" }
  | { type: "toggleReadAloud" }
  | { type: "toggleVoice" }
  | { type: "focusSidebar" }
  | { type: "skipToMain" }
  | { type: "about" }
  | { type: "sos" };

let capturedNavigateCb: ((path: string) => void) | undefined;
let capturedCommandCb: ((cmd: Command) => void | Promise<void>) | undefined;

const offNavMock = jest.fn();
const offCmdMock = jest.fn();
const showNativeDialogMock = jest.fn(async (_msg: string) => undefined);

jest.mock("../cc", () => ({
  cc: () => ({
    onNavigate: (cb: (path: string) => void) => {
      capturedNavigateCb = cb;
      return offNavMock;
    },
    onCommand: (cb: (cmd: Command) => void | Promise<void>) => {
      capturedCommandCb = cb;
      return offCmdMock;
    },
    showNativeDialog: showNativeDialogMock,
  }),
}));

/**
 * Mock layout components.
 */
jest.mock("../components/uiPieces", () => {
  const React = require("react");

  return {
    QuickActionsBar: (props: any) => (
      <div data-testid="quick-actions">
        <div data-testid="qa-readAloud">{String(props.readAloud)}</div>
        <button data-testid="qa-toggle-read" onClick={props.onToggleRead}>
          toggle read
        </button>
        <button data-testid="qa-open-settings" onClick={props.onOpenSettings}>
          open settings
        </button>
      </div>
    ),

    Sidebar: (props: any) => (
      <nav
        data-testid="sidebar"
        ref={(el: HTMLElement | null) => {
          if (props.sidebarRef) props.sidebarRef.current = el;
        }}
      >
        <button data-focus-start="sidebar">Sidebar Focus Start</button>
        <div data-testid="active-path">{props.activePath}</div>
        <button onClick={() => props.onNavigate("/tasks")}>go tasks</button>
      </nav>
    ),

    StatusBar: (props: any) => <div data-testid="statusbar">{props.lastSync}</div>,
  };
});

/**
 * Mock pages.
 */
jest.mock("../pages/DashboardPage", () => () => <div data-testid="page">dashboard</div>);
jest.mock("../pages/MedicationsPage", () => () => <div data-testid="page">medications</div>);
jest.mock("../pages/MedicationDetailsPage", () => () => <div data-testid="page">medication-details</div>);
jest.mock("../pages/TasksPage", () => () => <div data-testid="page">tasks</div>);
jest.mock("../pages/TaskDetailsPage", () => () => <div data-testid="page">task-details</div>);
jest.mock("../pages/AppointmentsPage", () => () => <div data-testid="page">appointments</div>);
jest.mock("../pages/AppointmentDetailsPage", () => () => <div data-testid="page">appointment-details</div>);
jest.mock("../pages/SettingsPage", () => () => <div data-testid="page">settings</div>);
jest.mock("../pages/LandingPage", () => () => <div data-testid="page">landing</div>);
jest.mock("../pages/RoleSelectPage", () => () => <div data-testid="page">role</div>);
jest.mock("../pages/LoginPage", () => () => <div data-testid="page">login</div>);
jest.mock("../pages/CreateAccountPage", () => () => <div data-testid="page">create-account</div>);
jest.mock("../pages/ResetPasswordPage", () => () => <div data-testid="page">reset-password</div>);

// Import AFTER mocks
import App from "../App";

function renderAt(path: string) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <App />
    </MemoryRouter>
  );
}

describe("App", () => {
  beforeEach(() => {
    capturedNavigateCb = undefined;
    capturedCommandCb = undefined;
    offNavMock.mockClear();
    offCmdMock.mockClear();
    showNativeDialogMock.mockClear();
  });

  test("auth routes hide QuickActionsBar, Sidebar, and StatusBar", () => {
    renderAt("/login");

    expect(screen.getByTestId("page")).toHaveTextContent("login");
    expect(screen.queryByTestId("quick-actions")).toBeNull();
    expect(screen.queryByTestId("sidebar")).toBeNull();
    expect(screen.queryByTestId("statusbar")).toBeNull();
  });

  test("non-auth routes show QuickActionsBar, Sidebar, and StatusBar", () => {
    renderAt("/");

    expect(screen.getByTestId("page")).toHaveTextContent("dashboard");
    expect(screen.getByTestId("quick-actions")).toBeInTheDocument();
    expect(screen.getByTestId("sidebar")).toBeInTheDocument();
    expect(screen.getByTestId("statusbar")).toBeInTheDocument();
  });

  test("registers preload listeners and cleans them up on unmount", () => {
    const { unmount } = renderAt("/");

    expect(typeof capturedNavigateCb).toBe("function");
    expect(typeof capturedCommandCb).toBe("function");

    unmount();

    expect(offNavMock).toHaveBeenCalledTimes(1);
    expect(offCmdMock).toHaveBeenCalledTimes(1);
  });

  test("IPC onNavigate navigates to another route", () => {
    renderAt("/");

    expect(screen.getByTestId("page")).toHaveTextContent("dashboard");

    act(() => {
      capturedNavigateCb?.("/settings");
    });

    expect(screen.getByTestId("page")).toHaveTextContent("settings");
  });

  test("command: focusSidebar focuses the sidebar focus-start element", async () => {
    renderAt("/");

    const focusStartBtn = screen.getByText("Sidebar Focus Start");

    await act(async () => {
      await capturedCommandCb?.({ type: "focusSidebar" });
    });

    expect(document.activeElement).toBe(focusStartBtn);
  });

  test("command: skipToMain focuses the main content area", async () => {
    renderAt("/");

    const main = screen.getByLabelText("Main Content");

    await act(async () => {
      await capturedCommandCb?.({ type: "skipToMain" });
    });

    expect(document.activeElement).toBe(main);
  });

  test("command: about calls native dialog with expected message", async () => {
    renderAt("/");

    await act(async () => {
      await capturedCommandCb?.({ type: "about" });
    });

    expect(showNativeDialogMock).toHaveBeenCalledTimes(1);
    expect(showNativeDialogMock.mock.calls[0][0]).toMatch(/CareConnect Desktop/i);
  });

  test("command: toggleReadAloud flips QuickActionsBar prop", async () => {
    renderAt("/");

    expect(screen.getByTestId("qa-readAloud")).toHaveTextContent("false");

    await act(async () => {
      await capturedCommandCb?.({ type: "toggleReadAloud" });
    });

    expect(screen.getByTestId("qa-readAloud")).toHaveTextContent("true");
  });
});