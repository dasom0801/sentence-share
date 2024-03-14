import React from 'react';
import type { Preview } from '@storybook/react';
import { ThemeProvider } from '@mui/material';
import { GlobalStyles } from '../src/components';
import { MUI_THEME } from '../src/constants';

const muiTheme = MUI_THEME;

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story) => (
      <>
        <ThemeProvider theme={muiTheme}>
          <GlobalStyles />
          <Story />
        </ThemeProvider>
      </>
    ),
  ],
};

export default preview;
