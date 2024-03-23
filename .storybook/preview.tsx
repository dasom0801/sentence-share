import React from 'react';
import type { Preview } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HelmetProvider } from 'react-helmet-async';
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
                <ThemeProvider theme={muiTheme}>
                  <GlobalStyles />
                  <Story />
                </ThemeProvider>
              </HelmetProvider>
            </BrowserRouter>
          </QueryClientProvider>
        </>
      );
    },
  ],
};

export default preview;
