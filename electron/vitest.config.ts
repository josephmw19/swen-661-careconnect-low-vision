import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    css: true,
    setupFiles: ['./src/ui/_tests_/setupTests.ts'],
    include: [
      'src/**/*.{test,spec}.?(c|m)[jt]s?(x)',
      'src/**/_tests_/**/*.{test,spec}.?(c|m)[jt]s?(x)',
    ],
    exclude: [
      '**/node_modules/**',
      '**/dist/**',
      '**/dist-electron/**',
    ],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      all: true,
      include: ['src/**/*.{ts,tsx}'],
      exclude: [
        '**/*.d.ts',
        'src/ui/_tests_/**',
        '**/node_modules/**',
        '**/dist/**',
        '**/dist-electron/**',
      ],
    },
  },
});
