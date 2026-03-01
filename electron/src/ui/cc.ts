export function cc() {
  const api = (window as any).careconnect;
  if (!api) {
    throw new Error("careconnect preload API not available. Is Electron preload running?");
  }
  return api;
}