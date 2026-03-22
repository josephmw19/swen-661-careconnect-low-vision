import { cc } from "../cc";

describe("cc()", () => {
  afterEach(() => {
    delete (window as any).careconnect;
    jest.restoreAllMocks();
  });

  it("returns browser fallback when window.careconnect is missing", async () => {
    const api = cc();

    expect(api).toBeDefined();
    expect(typeof api.onNavigate).toBe("function");
    expect(typeof api.onCommand).toBe("function");
    expect(typeof api.showNativeDialog).toBe("function");
  });

  it("returns window.careconnect when present", () => {
    const mockApi = {
      onNavigate: jest.fn(() => jest.fn()),
      onCommand: jest.fn(() => jest.fn()),
      showNativeDialog: jest.fn(async () => {}),
    };

    (window as any).careconnect = mockApi;

    expect(cc()).toBe(mockApi);
  });

  it("browser fallback showNativeDialog uses alert", async () => {
    const alertSpy = jest.spyOn(window, "alert").mockImplementation(() => {});
    const api = cc();

    await api.showNativeDialog("Hello");

    expect(alertSpy).toHaveBeenCalledWith("Hello");
  });
});