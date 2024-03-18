/// <reference types="vitest" />
import path from 'path';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vite';

export default defineConfig({
  test: {
    globals: true,
    setupFiles: './src/setupTests.ts',
    environment: 'jsdom',
  },
  plugins: [react(), tsconfigPaths()],
  server: {
    port: 3000,
    open: true,
  },
  resolve: {
    alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
  },
});
