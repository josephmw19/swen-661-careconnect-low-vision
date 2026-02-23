import { contextBridge, ipcRenderer } from "electron";

type Command =
  | { type: "refresh" }
  | { type: "toggleCritical" }
  | { type: "toggleReadAloud" }
  | { type: "toggleVoice" }
  | { type: "focusSidebar" }
  | { type: "skipToMain" }
  | { type: "about" }
  | { type: "sos" };

contextBridge.exposeInMainWorld("careconnect", {
  onNavigate: (cb: (path: string) => void) => {
    const handler = (_: unknown, path: string) => cb(path);
    ipcRenderer.on("cc:navigate", handler);
    return () => ipcRenderer.removeListener("cc:navigate", handler);
  },
  onCommand: (cb: (cmd: Command) => void) => {
    const handler = (_: unknown, cmd: Command) => cb(cmd);
    ipcRenderer.on("cc:command", handler);
    return () => ipcRenderer.removeListener("cc:command", handler);
  },
  showNativeDialog: (message: string) => ipcRenderer.invoke("cc:showNativeDialog", message)
});

export {};
