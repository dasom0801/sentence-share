/** @jsxImportSource @emotion/react */

import { Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import { ThemeProvider, colors, createTheme } from '@mui/material';
import { css } from '@emotion/react';

import { GlobalStyles, Header } from '@/components';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorResult } from './components/common';

const queryClient = new QueryClient();
const muiTheme = createTheme({
  palette: {
    secondary: {
      main: colors.blueGrey[800],
    },
  },
  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
    },
  },
});

const App = () => {
  return (
    <HelmetProvider>
      <Helmet>
        <title>Sentence Share</title>
      </Helmet>

      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={muiTheme}>
          <GlobalStyles />
          <Header />
          <div
            css={css`
              padding-top: 56px;
            `}
          >
            <ErrorBoundary FallbackComponent={ErrorResult}>
              <Outlet />
            </ErrorBoundary>
          </div>
        </ThemeProvider>

        <Toaster />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </HelmetProvider>
  );
};

export default App;
