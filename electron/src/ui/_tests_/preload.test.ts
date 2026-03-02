// src/ui/_tests_/preload.test.ts

// NOTE: We intentionally use require("electron") inside helpers instead of importing ipcRenderer/contextBridge
// because this test uses jest.resetModules() and we want the fresh mocked instances each time.

jest.mock("electron", () => ({
  contextBridge: {
    exposeInMainWorld: jest.fn(),
  },
  ipcRenderer: {
    on: jest.fn(),
    removeListener: jest.fn(),
    invoke: jest.fn(),
  },
}));

type ExposedApi = {
  onNavigate: (cb: (path: string) => void) => () => void;
  onCommand: (cb: (cmd: any) => void) => () => void;
  showNativeDialog: (message: string) => Promise<any>;
};

function getElectronMocks() {
  const { contextBridge, ipcRenderer } = require("electron") as {
    contextBridge: { exposeInMainWorld: jest.Mock };
    ipcRenderer: {
      on: jest.Mock;
      removeListener: jest.Mock;
      invoke: jest.Mock;
    };
  };
  return { contextBridge, ipcRenderer };
}

function getExposedApi(): ExposedApi {
  jest.resetModules();

  const { contextBridge } = getElectronMocks();

  // IMPORTANT: match your actual preload path
  require("../../../electron/preload");

  expect(contextBridge.exposeInMainWorld).toHaveBeenCalledTimes(1);

  const [key, api] = (contextBridge.exposeInMainWorld as jest.Mock).mock.calls[0];
  expect(key).toBe("careconnect");

  return api as ExposedApi;
}

describe("preload", () => {
  beforeEach(() => {
    // Clear mocks between tests
    const { contextBridge, ipcRenderer } = getElectronMocks();
    contextBridge.exposeInMainWorld.mockClear();
    ipcRenderer.on.mockClear();
    ipcRenderer.removeListener.mockClear();
    ipcRenderer.invoke.mockClear();
  });

  test("exposes careconnect api", () => {
    const api = getExposedApi();

    expect(api).toBeTruthy();
    expect(typeof api.onNavigate).toBe("function");
    expect(typeof api.onCommand).toBe("function");
    expect(typeof api.showNativeDialog).toBe("function");
  });

  test("onNavigate wires ipc listener and cleanup removes it", () => {
    const api = getExposedApi();
    const { ipcRenderer } = getElectronMocks();

    const cb = jest.fn();
    const cleanup = api.onNavigate(cb);

    expect(ipcRenderer.on).toHaveBeenCalledWith("cc:navigate", expect.any(Function));

    // Trigger the captured handler to ensure it forwards payload to cb
    const handler = ipcRenderer.on.mock.calls.find((c: any[]) => c[0] === "cc:navigate")?.[1];
    expect(typeof handler).toBe("function");
    handler({}, "/appointments");
    expect(cb).toHaveBeenCalledWith("/appointments");

    cleanup();
    expect(ipcRenderer.removeListener).toHaveBeenCalledWith("cc:navigate", handler);
  });

  test("onCommand wires ipc listener and cleanup removes it", () => {
    const api = getExposedApi();
    const { ipcRenderer } = getElectronMocks();

    const cb = jest.fn();
    const cleanup = api.onCommand(cb);

    expect(ipcRenderer.on).toHaveBeenCalledWith("cc:command", expect.any(Function));

    const handler = ipcRenderer.on.mock.calls.find((c: any[]) => c[0] === "cc:command")?.[1];
    expect(typeof handler).toBe("function");

    const cmd = { type: "sos" };
    handler({}, cmd);
    expect(cb).toHaveBeenCalledWith(cmd);

    cleanup();
    expect(ipcRenderer.removeListener).toHaveBeenCalledWith("cc:command", handler);
  });

  test("showNativeDialog invokes ipc", async () => {
    const api = getExposedApi();
    const { ipcRenderer } = getElectronMocks();

    ipcRenderer.invoke.mockResolvedValueOnce("ok");

    const res = await api.showNativeDialog("Hello");
    expect(ipcRenderer.invoke).toHaveBeenCalledWith("cc:showNativeDialog", "Hello");
    expect(res).toBe("ok");
  });
});