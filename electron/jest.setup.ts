// jest.setup.ts
import "@testing-library/jest-dom";
import { TextDecoder, TextEncoder } from "node:util";

// Polyfill TextEncoder/TextDecoder (react-router needs these in some Jest/Node combos)
if (typeof global.TextEncoder === "undefined") {
  // @ts-ignore
  global.TextEncoder = TextEncoder;
}
if (typeof global.TextDecoder === "undefined") {
  // @ts-ignore
  global.TextDecoder = TextDecoder;
}

// Only run DOM-specific polyfills when a DOM exists (jsdom environment)
const hasDom =
  typeof window !== "undefined" &&
  typeof document !== "undefined" &&
  typeof (globalThis as any).HTMLElement !== "undefined";

if (hasDom) {
  // JSDOM doesn't implement scrollTo on elements
  Object.defineProperty((globalThis as any).HTMLElement.prototype, "scrollTo", {
    value: function () {},
    writable: true,
  });

  // (Optional but commonly needed)
  // matchMedia polyfill for components that rely on it
  if (!window.matchMedia) {
    window.matchMedia = ((query: string) =>
      ({
        matches: false,
        media: query,
        onchange: null,
        addListener: () => {},
        removeListener: () => {},
        addEventListener: () => {},
        removeEventListener: () => {},
        dispatchEvent: () => false,
      }) as any) as any;
  }
}