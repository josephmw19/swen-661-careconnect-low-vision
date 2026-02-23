export {};

type Route = "/" | "/medications" | "/settings";

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
      onNavigate: (handler: (path: string) => void) => void | (() => void);
      onCommand: (handler: (cmd: Command) => void | Promise<void>) => void | (() => void);
      showNativeDialog: (message: string) => Promise<void>;
    };
  }
}