import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter, Routes, Route, useNavigate } from "react-router-dom";
import ScrollToTop from "../components/ScrollToTop";

function NavOnMount({ to }: { to: string }) {
  const nav = useNavigate();
  React.useEffect(() => {
    nav(to);
  }, [nav, to]);
  return null;
}

describe("ScrollToTop", () => {
  test("scrolls window to top on route change when no containerRef", () => {
    const winScroll = jest.spyOn(window, "scrollTo").mockImplementation(() => {});

    render(
      <MemoryRouter initialEntries={["/a"]}>
        <ScrollToTop />
        <Routes>
          <Route path="/a" element={<NavOnMount to="/b" />} />
          <Route path="/b" element={<div>done</div>} />
        </Routes>
      </MemoryRouter>
    );

    const calls = winScroll.mock.calls.map((c) => c[0]);
    const hasTopZero = calls.some(
      (arg) =>
        typeof arg === "object" &&
        arg !== null &&
        "top" in arg &&
        (arg as any).top === 0
    );

    expect(winScroll).toHaveBeenCalled();
    expect(hasTopZero).toBe(true);

    winScroll.mockRestore();
  });

  test("scrolls container element when containerRef is provided", () => {
    const containerRef: React.MutableRefObject<HTMLElement | null> = { current: null };

    const scrollToMock = jest.fn();
    const el = document.createElement("div");
    (el as any).scrollTo = scrollToMock;
    containerRef.current = el;

    const winScroll = jest.spyOn(window, "scrollTo").mockImplementation(() => {});

    render(
      <MemoryRouter initialEntries={["/a"]}>
        <ScrollToTop containerRef={containerRef as any} />
        <Routes>
          <Route path="/a" element={<NavOnMount to="/b" />} />
          <Route path="/b" element={<div>done</div>} />
        </Routes>
      </MemoryRouter>
    );

    expect(scrollToMock).toHaveBeenCalled();
    expect(winScroll).not.toHaveBeenCalled();

    winScroll.mockRestore();
  });
});