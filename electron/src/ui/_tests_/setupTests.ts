export {}

import '@testing-library/jest-dom';

// ✅ Fix ScrollToTop + anything calling scrollTo in jsdom
Object.defineProperty(HTMLElement.prototype, 'scrollTo', {
  value: () => {},
  writable: true,
});
Object.defineProperty(window, 'scrollTo', {
  value: () => {},
  writable: true,
});
(document.documentElement as any).scrollTo = () => {};
(document.body as any).scrollTo = () => {};

// ✅ Mock Electron preload API used by cc()
const mockCareconnect = {
  onNavigate: (_cb: (path: string) => void) => {
    return () => {};
  },

  onCommand: (_cb: (cmd: any) => void) => {
    return () => {};
  },

  // add more methods if a test complains they're missing
  getSettings: async () => ({ fontScale: 1, highContrast: false }),
  saveSettings: async () => true,

  getAppointments: async () => [],
  saveAppointments: async () => true,

  getMedications: async () => [],
  saveMedications: async () => true,

  getTasks: async () => [],
  saveTasks: async () => true,

  signIn: async () => ({ ok: true }),
  signOut: async () => true,
};

Object.defineProperty(window, 'careconnect', {
  value: mockCareconnect,
  writable: true,
});
