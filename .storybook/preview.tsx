import React from 'react';
import type { Preview } from '@storybook/react';
import { ThemeProvider } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import '../src/styles/global.scss';

import { MUI_THEME } from '../src/constants';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    nextjs: {
      appDirectory: true,
    },
  },

  decorators: [
    (Story) => {
      const client = new QueryClient({
        defaultOptions: {
          queries: {
            retry: false,
          },
        },
      });

      return (
        <>
          <QueryClientProvider client={client}>
            <ThemeProvider theme={MUI_THEME}>
              <Story />
            </ThemeProvider>
          </QueryClientProvider>
        </>
      );
    },
  ],

  tags: ['autodocs'],
};

export default preview;
