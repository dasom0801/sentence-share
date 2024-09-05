/** @jsxImportSource @emotion/react */

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from '@mui/material';

import { AuthGuard, ErrorResult, GlobalStyles, Header } from '@/components';
import { ErrorBoundary } from 'react-error-boundary';
import { MUI_THEME } from './constants';
import { MainPage } from '@/feature/main';
import { SentenceEditPage } from '@/feature/sentence-edit';

const queryClient = new QueryClient();
const Router = () => (
  <Routes>
    <Route path="/">
      <Route path="/" element={<MainPage />} />
      <Route element={<AuthGuard />}>
        <Route path="/edit/sentence" element={<SentenceEditPage />} />
        <Route path="/edit/sentence/:id" element={<SentenceEditPage />} />
      </Route>
    </Route>
  </Routes>
);

const App = () => {
  return (
    <HelmetProvider>
      <Helmet>
        <title>Sentence Share</title>
      </Helmet>

      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={MUI_THEME}>
          <GlobalStyles />
          <BrowserRouter>
            <Header />
            <ErrorBoundary FallbackComponent={ErrorResult}>
              <Router />
            </ErrorBoundary>
          </BrowserRouter>
        </ThemeProvider>

        <Toaster />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </HelmetProvider>
  );
};

export default App;
