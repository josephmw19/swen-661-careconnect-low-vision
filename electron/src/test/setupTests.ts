import "@testing-library/jest-dom";

// Polyfill for react-router / undici usage in Jest+jsdom
import { TextEncoder, TextDecoder } from "node:util";

if (!globalThis.TextEncoder) {
  (globalThis as any).TextEncoder = TextEncoder;
}
if (!globalThis.TextDecoder) {
  (globalThis as any).TextDecoder = TextDecoder as any;
}