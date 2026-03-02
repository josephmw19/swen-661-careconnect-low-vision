/**
 * @jest-environment node
 */
import { jest } from "@jest/globals";

const exposeInMainWorld = jest.fn();

const invoke = jest.fn();
const send = jest.fn();
const on = jest.fn();

jest.mock("electron", () => ({
  contextBridge: { exposeInMainWorld },
  ipcRenderer: { invoke, send, on },
}));

describe("preload", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("exposes careconnect API in main world", async () => {
    await import("../../../electron/preload");

    expect(exposeInMainWorld).toHaveBeenCalledTimes(1);

    const [key, api] = exposeInMainWorld.mock.calls[0] as [string, any];
    expect(key).toBe("careconnect");

    expect(typeof api.onNavigate).toBe("function");
    expect(typeof api.onCommand).toBe("function");
    expect(typeof api.showNativeDialog).toBe("function");
  });
});