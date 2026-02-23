export {};

declare global {
  interface Window {
    careconnect: {
      onNavigate: (cb: (path: string) => void) => () => void;
      onCommand: (cb: (cmd: any) => void) => () => void;
      showNativeDialog: (message: string) => Promise<void>;
    };
  }
}
