import { cc } from "../cc";

describe("cc bridge", () => {
  test("returns the api when available", () => {
    const mock = { onNavigate: jest.fn() };
    (window as any).careconnect = mock;
    expect(cc()).toBe(mock);
  });

  test("throws when api is missing", () => {
    (window as any).careconnect = undefined;
    expect(() => cc()).toThrow();
  });
});