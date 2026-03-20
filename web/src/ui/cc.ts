type Command =
  | { type: "refresh" }
  | { type: "toggleCritical" }
  | { type: "toggleReadAloud" }
  | { type: "toggleVoice" }
  | { type: "focusSidebar" }
  | { type: "skipToMain" }
  | { type: "about" }
  | { type: "sos" };

type CareConnectApi = {
  onNavigate: (cb: (path: string) => void) => () => void;
  onCommand: (cb: (cmd: Command) => void) => () => void;
  showNativeDialog: (message: string) => Promise<void>;
};

const browserFallback: CareConnectApi = {
  onNavigate: () => () => {},
  onCommand: () => () => {},
  showNativeDialog: async (message: string) => {
    window.alert(message);
  },
};

export function cc(): CareConnectApi {
  return (window as any).careconnect ?? browserFallback;
}