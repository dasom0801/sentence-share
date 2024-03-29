/** @jsxImportSource @emotion/react */

import { Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import { ThemeProvider } from '@mui/material';
import { css } from '@emotion/react';

import { GlobalStyles, Header, ErrorResult } from '@/components';
import { ErrorBoundary } from 'react-error-boundary';
import { MUI_THEME } from './constants';

const queryClient = new QueryClient();

const App = () => {
  return (
    <HelmetProvider>
      <Helmet>
        <title>Sentence Share</title>
      </Helmet>

      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={MUI_THEME}>
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
