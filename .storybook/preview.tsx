import { ThemeProvider } from '@mui/material';
import type { Preview } from '@storybook/nextjs-vite';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { initialize as initializeMsw, mswLoader } from 'msw-storybook-addon';
import { Toaster } from 'react-hot-toast';
import '../src/styles/global.scss';

import { MUI_THEME } from '../src/lib/mui/theme';

initializeMsw({
  onUnhandledRequest: 'bypass',
});

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
    a11y: {
      test: 'error',
    },
    msw: {
      handlers: [], // 기본값만 설정
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
              <Toaster />
            </ThemeProvider>
          </QueryClientProvider>
        </>
      );
    },
  ],
  tags: ['autodocs'],
  loaders: [mswLoader],
};

export default preview;
