/**
 * @jest-environment node
 */
import fs from "node:fs";
import { loadWindowState } from "../windowState";

// mock electron app.getPath
jest.mock("electron", () => ({
  app: {
    getPath: () => "/tmp",
  },
}));

jest.mock("node:fs");

test("loadWindowState returns file state when valid JSON exists", () => {
  (fs.readFileSync as any).mockReturnValueOnce(
    JSON.stringify({
      bounds: { x: 10, y: 20, width: 1200, height: 800 },
      isMaximized: true,
    })
  );

  const s = loadWindowState({ x: 0, y: 0, width: 800, height: 600 } as any);
  expect(s.bounds.width).toBe(1200);
  expect(s.isMaximized).toBe(true);
});

test("loadWindowState returns defaults when file missing/invalid", () => {
  (fs.readFileSync as any).mockImplementationOnce(() => {
    throw new Error("missing");
  });

  const s = loadWindowState({ x: 1, y: 2, width: 800, height: 600 } as any);
  expect(s.bounds.width).toBe(800);
  expect(s.isMaximized).toBe(false);
});