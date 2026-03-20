// src/ui/_tests_/main.test.ts
import type { Mock } from "jest-mock";

// src/ui/_tests_/main.test.ts

function flushPromises() {
  return new Promise<void>((resolve) => setTimeout(resolve, 0));
}

type ElectronModuleMock = {
  app: {
    isPackaged: boolean;
    name: string;
    whenReady: jest.Mock; 
    on: jest.Mock;        
    quit: jest.Mock;      
  };
  BrowserWindow: any;
  Menu: {
    buildFromTemplate: jest.Mock;   
    setApplicationMenu: jest.Mock;  
  };
  dialog: {
    showMessageBox: jest.Mock; 
  };
  ipcMain: {
    handle: jest.Mock; 
  };
};

describe("electron/main.ts", () => {
  let electronMock: ElectronModuleMock;

  // Captured callbacks
  let onHandlers: Record<string, Function>;
  let ipcHandlers: Record<string, Function>;

  // Captured menu template
  let lastMenuTemplate: any[] | null;

  // BrowserWindow instance plumbing
  let bwInstance: any;
  let webContents: any;

  function setupElectronMock(opts?: { isPackaged?: boolean; windowsCount?: number }) {
    onHandlers = {};
    ipcHandlers = {};
    lastMenuTemplate = null;

    webContents = {
      send: jest.fn(),
      reload: jest.fn(),
    };

    // Support .once("ready-to-show", cb) and .on("closed", cb)
    const onceHandlers: Record<string, Function> = {};
    const eventHandlers: Record<string, Function> = {};

    bwInstance = {
      webContents,
      loadURL: jest.fn(),
      loadFile: jest.fn(),
      show: jest.fn(),
      once: jest.fn((event: string, cb: Function) => {
        onceHandlers[event] = cb;
      }),
      on: jest.fn((event: string, cb: Function) => {
        eventHandlers[event] = cb;
      }),

      // helpers for tests
      __triggerOnce(event: string) {
        onceHandlers[event]?.();
      },
      __triggerOn(event: string) {
        eventHandlers[event]?.();
      },
    };

    const BrowserWindowCtor = jest.fn(() => bwInstance) as any;
    BrowserWindowCtor.getAllWindows = jest.fn(() => {
      const n = opts?.windowsCount ?? 1;
      return Array.from({ length: n }, () => ({}));
    });

    electronMock = {
      app: {
        isPackaged: opts?.isPackaged ?? false,
        name: "CareConnect",
        whenReady: jest.fn(() => Promise.resolve()),
        on: jest.fn((event: string, cb: Function) => {
          onHandlers[event] = cb;
        }),
        quit: jest.fn(),
      },
      BrowserWindow: BrowserWindowCtor,
      Menu: {
        buildFromTemplate: jest.fn((template: any[]) => {
          lastMenuTemplate = template;
          return { __menu: true };
        }),
        setApplicationMenu: jest.fn(),
      },
      dialog: {
        showMessageBox: jest.fn(async () => {}),
      },
      ipcMain: {
        handle: jest.fn((channel: string, cb: Function) => {
          ipcHandlers[channel] = cb;
        }),
      },
    };

    jest.doMock("electron", () => electronMock);
  }

  async function importMain() {
    // main.ts has side effects on import, so always isolate
    jest.resetModules();
    await import("../../../electron/main");
    await flushPromises();
  }

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.dontMock("electron");
  });

  test("creates menu and window, loads dev URL when not packaged", async () => {
    setupElectronMock({ isPackaged: false, windowsCount: 1 });

    await importMain();

    expect(electronMock.BrowserWindow).toHaveBeenCalledTimes(1);
    expect(bwInstance.loadURL).toHaveBeenCalledWith("http://localhost:5173");

    expect(electronMock.Menu.buildFromTemplate).toHaveBeenCalledTimes(1);
    expect(electronMock.Menu.setApplicationMenu).toHaveBeenCalledTimes(1);

    // ready-to-show hook shows the window
    bwInstance.__triggerOnce("ready-to-show");
    expect(bwInstance.show).toHaveBeenCalledTimes(1);

    // closed hook clears mainWindow (indirectly covered by calling it without throwing)
    bwInstance.__triggerOn("closed");
  });

  test("loads dist file when packaged", async () => {
    setupElectronMock({ isPackaged: true, windowsCount: 1 });

    await importMain();

    expect(electronMock.BrowserWindow).toHaveBeenCalledTimes(1);
    expect(bwInstance.loadFile).toHaveBeenCalledTimes(1);
    expect(bwInstance.loadURL).not.toHaveBeenCalled();
  });

  test("menu click handlers send navigate and command messages, refresh reloads", async () => {
    setupElectronMock({ isPackaged: false, windowsCount: 1 });

    await importMain();
    expect(lastMenuTemplate).toBeTruthy();

    const findMenuItem = (topLabel: string, itemLabel: string) => {
      const top = (lastMenuTemplate ?? []).find((t) => t.label === topLabel);
      const sub = top?.submenu ?? [];
      return sub.find((s: any) => s.label === itemLabel);
    };

    // File -> Open Settings
    findMenuItem("File", "Open Settings")?.click?.();
    expect(webContents.send).toHaveBeenCalledWith("cc:navigate", "/settings");

    // View -> Refresh
    findMenuItem("View", "Refresh")?.click?.();
    expect(webContents.reload).toHaveBeenCalledTimes(1);

    // View commands
    findMenuItem("View", "Toggle Critical Medical Information")?.click?.();
    expect(webContents.send).toHaveBeenCalledWith("cc:command", { type: "toggleCritical" });

    findMenuItem("View", "Toggle Read Aloud")?.click?.();
    expect(webContents.send).toHaveBeenCalledWith("cc:command", { type: "toggleReadAloud" });

    findMenuItem("View", "Toggle Voice Commands")?.click?.();
    expect(webContents.send).toHaveBeenCalledWith("cc:command", { type: "toggleVoice" });

    // Navigate items
    findMenuItem("Navigate", "Home (Dashboard)")?.click?.();
    expect(webContents.send).toHaveBeenCalledWith("cc:navigate", "/");

    findMenuItem("Navigate", "Medications")?.click?.();
    expect(webContents.send).toHaveBeenCalledWith("cc:navigate", "/medications");

    findMenuItem("Navigate", "Tasks")?.click?.();
    expect(webContents.send).toHaveBeenCalledWith("cc:navigate", "/tasks");

    findMenuItem("Navigate", "Appointments")?.click?.();
    expect(webContents.send).toHaveBeenCalledWith("cc:navigate", "/appointments");

    findMenuItem("Navigate", "Settings")?.click?.();
    expect(webContents.send).toHaveBeenCalledWith("cc:navigate", "/settings");

    // Navigate focus helpers
    findMenuItem("Navigate", "Focus Sidebar")?.click?.();
    expect(webContents.send).toHaveBeenCalledWith("cc:command", { type: "focusSidebar" });

    findMenuItem("Navigate", "Skip to Main Content")?.click?.();
    expect(webContents.send).toHaveBeenCalledWith("cc:command", { type: "skipToMain" });

    // Help items
    findMenuItem("Help", "About CareConnect")?.click?.();
    expect(webContents.send).toHaveBeenCalledWith("cc:command", { type: "about" });

    findMenuItem("Help", "Trigger SOS (Demo)")?.click?.();
    expect(webContents.send).toHaveBeenCalledWith("cc:command", { type: "sos" });
  });

  test("activate creates a new window when no windows exist", async () => {
    // Start with 0 windows so activate path calls createWindow()
    setupElectronMock({ isPackaged: false, windowsCount: 0 });

    await importMain();

    // First createWindow happens on whenReady
    expect(electronMock.BrowserWindow).toHaveBeenCalledTimes(1);

    // Trigger activate callback
    expect(onHandlers.activate).toBeDefined();
    onHandlers.activate();

    expect(electronMock.BrowserWindow).toHaveBeenCalledTimes(2);
  });

  test("window-all-closed quits when not darwin", async () => {
    setupElectronMock({ isPackaged: false, windowsCount: 1 });

    // Force a non-darwin platform for this test (Jest usually runs on linux in CI, but you are on mac).
    const originalPlatform = process.platform;
    Object.defineProperty(process, "platform", { value: "win32" });

    try {
      await importMain();

      expect(onHandlers["window-all-closed"]).toBeDefined();
      onHandlers["window-all-closed"]();

      expect(electronMock.app.quit).toHaveBeenCalledTimes(1);
    } finally {
      Object.defineProperty(process, "platform", { value: originalPlatform });
    }
  });

  test("ipcMain handler shows native dialog when mainWindow exists", async () => {
    setupElectronMock({ isPackaged: false, windowsCount: 1 });
    await importMain();

    expect(electronMock.ipcMain.handle).toHaveBeenCalledWith(
      "cc:showNativeDialog",
      expect.any(Function)
    );

    const handler = ipcHandlers["cc:showNativeDialog"];
    expect(handler).toBeDefined();

    await handler({}, "Hello from test");

    expect(electronMock.dialog.showMessageBox).toHaveBeenCalledTimes(1);
    expect(electronMock.dialog.showMessageBox).toHaveBeenCalledWith(
      bwInstance,
      expect.objectContaining({
        type: "info",
        title: "CareConnect",
        message: "Hello from test",
      })
    );
  });
});