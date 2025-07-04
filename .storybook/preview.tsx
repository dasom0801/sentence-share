import { ThemeProvider } from '@mui/material';
import type { Preview } from '@storybook/nextjs-vite';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import '../src/styles/global.scss';

import { MUI_THEME } from '../src/lib/mui/theme';

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
