beforeAll(() => {
  // Mock the missing scrollTo methods globally
  window.scrollTo = jest.fn();
  Element.prototype.scrollTo = jest.fn();
});

import "@testing-library/jest-dom";
import { TextEncoder, TextDecoder } from "node:util";

if (!globalThis.TextEncoder) {
  // @ts-expect-error
  globalThis.TextEncoder = TextEncoder;
}
if (!globalThis.TextDecoder) {
  // @ts-expect-error
  globalThis.TextDecoder = TextDecoder;
}

// jest.setup.ts
Object.defineProperty(HTMLElement.prototype, "scrollTo", {
  value: function () {},
  writable: true,
});