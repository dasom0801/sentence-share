import React from 'react';
import type { Preview } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HelmetProvider } from 'react-helmet-async';
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
            <BrowserRouter>
              <HelmetProvider>
                <ThemeProvider theme={MUI_THEME}>
                  <Story />
                </ThemeProvider>
              </HelmetProvider>
            </BrowserRouter>
          </QueryClientProvider>
        </>
      );
    },
  ],

  tags: ['autodocs'],
};

export default preview;
