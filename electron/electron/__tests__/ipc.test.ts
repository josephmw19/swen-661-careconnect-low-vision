/**
 * @jest-environment node
 */
import { registerIpc } from "../ipc";

test("registerIpc registers cc:showNativeDialog handler and calls dialog.showMessageBox", async () => {
  const handlers: Record<string, any> = {};

  const ipcMainMock = {
    handle: (channel: string, fn: any) => {
      handlers[channel] = fn;
    },
  } as any;

  const dialogMock = {
    showMessageBox: jest.fn().mockResolvedValue({}),
  } as any;

  const winMock = {} as any;

  registerIpc({
    ipcMain: ipcMainMock,
    dialog: dialogMock,
    getMainWindow: () => winMock,
  });

  expect(typeof handlers["cc:showNativeDialog"]).toBe("function");

  await handlers["cc:showNativeDialog"]({}, "Hello");
  expect(dialogMock.showMessageBox).toHaveBeenCalledWith(winMock, expect.objectContaining({ message: "Hello" }));
});