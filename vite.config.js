import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
console.log('Loaded vitest config');
export default defineConfig({
  base: '/',
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './setupTest.js',
  },
  server: {
    port: 3000,
  }
});