import { cc } from "../cc";

describe("cc()", () => {
  afterEach(() => {
    delete (window as any).careconnect;
  });

  it("throws if window.careconnect is missing", () => {
    expect(() => cc()).toThrow(/careconnect preload api not available/i);
  });

  it("returns window.careconnect when present", () => {
    (window as any).careconnect = { hello: "world" };
    expect(cc()).toEqual({ hello: "world" });
  });
});