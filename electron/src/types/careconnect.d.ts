export {};

type Route =
  | "/"
  | "/medications"
  | "/medications/:medId"
  | "/tasks"
  | "/tasks/:taskId"
  | "/appointments"
  | "/appointments/:appointmentId"
  | "/settings"
  | "/landing"
  | "/role"
  | "/login"
  | "/create-account"
  | "/reset-password";

type Command =
  | { type: "refresh" }
  | { type: "toggleCritical" }
  | { type: "toggleReadAloud" }
  | { type: "toggleVoice" }
  | { type: "focusSidebar" }
  | { type: "skipToMain" }
  | { type: "about" }
  | { type: "sos" };

declare global {
  interface Window {
    careconnect?: {
      onNavigate: (handler: (path: Route) => void) => void | (() => void);
      onCommand: (handler: (cmd: Command) => void | Promise<void>) => void | (() => void);
      showNativeDialog: (message: string) => Promise<void>;
    };
  }
}