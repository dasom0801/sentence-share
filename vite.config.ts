/// <reference types="vitest/config" />
/// <reference types="vitest" />
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';

import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'node:url';
import path from 'path';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
const dirname =
  typeof __dirname !== 'undefined'
    ? __dirname
    : path.dirname(fileURLToPath(import.meta.url));

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineConfig({
  test: {
    globals: true,
    setupFiles: './src/setupTests.ts',
    environment: 'jsdom',
    coverage: {
      exclude: ['src/app/api/**', 'src/db/**', '.next/'],
    },
    projects: [
      // 일반 테스트 파일 프로젝트 (.test.tsx, .test.ts)
      {
        extends: true,
        test: {
          name: 'default',
          include: ['**/*.{test,spec}.{js,ts,jsx,tsx}'],
          exclude: [
            '**/node_modules/**',
            '**/dist/**',
            '**/.{idea,git,cache,output,temp}/**',
          ],
          environment: 'jsdom',
        },
      },
      {
        extends: true,
        plugins: [
          // The plugin will run tests for the stories defined in your Storybook config
          // See options at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon#storybooktest
          storybookTest({
            configDir: path.join(dirname, '.storybook'),
          }),
        ],
        test: {
          name: 'storybook',
          browser: {
            enabled: true,
            headless: true,
            provider: 'playwright',
            name: 'chromium',
            // instances: [
            //   {
            //     browser: 'chromium',
            //   },
            // ],
          },
          setupFiles: ['.storybook/vitest.setup.ts'],
        },
      },
    ],
  },
  plugins: [react(), tsconfigPaths()],
  server: {
    port: 3000,
    open: true,
  },
  resolve: {
    alias: [
      {
        find: '@',
        replacement: path.resolve(__dirname, 'src'),
      },
    ],
  },
});
