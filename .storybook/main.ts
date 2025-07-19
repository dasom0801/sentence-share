import type { StorybookConfig } from '@storybook/nextjs-vite';
import path from 'path';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@chromatic-com/storybook',
    '@storybook/addon-docs',
    '@storybook/addon-vitest',
    '@storybook/addon-a11y',
  ],
  framework: '@storybook/nextjs-vite',
  docs: {},
  async viteFinal(config) {
    config.css = config.css || {};
    config.css.preprocessorOptions = config.css.preprocessorOptions || {};
    config.css.preprocessorOptions.scss = {
      additionalData: `@use "mixin" as *;`,
      includePaths: [path.resolve(__dirname, '../src/styles')],
    };
    return config;
  },
  staticDirs: ['../public'],
  features: {
    experimentalRSC: true,
  },
};
export default config;
