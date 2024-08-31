/** @jsxImportSource @emotion/react */

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from '@mui/material';
import { css } from '@emotion/react';

import { AuthGuard, ErrorResult, GlobalStyles, Header } from '@/components';
import { ErrorBoundary } from 'react-error-boundary';
import { MUI_THEME } from './constants';
import { MainPage } from '@/feature/main';
import { SentenceDetailPage } from '@/feature/sentence-detail';
import { BookDetailPage } from '@/feature/book-detail';
import { SettingPage } from '@/feature/setting';
import { UserSentencePage } from '@/feature/user-sentence';
import { UserLikePage } from '@/feature/user-like';
import { SentenceEditPage } from '@/feature/sentence-edit';

const queryClient = new QueryClient();
const Router = () => (
  <Routes>
    <Route path="/">
      <Route path="/" element={<MainPage />} />
      <Route path="/sentence/:id" element={<SentenceDetailPage />} />
      <Route path="/book/:id" element={<BookDetailPage />} />
      <Route element={<AuthGuard />}>
        <Route path="/my/setting" element={<SettingPage />} />
        <Route path="/my/sentence" element={<UserSentencePage />} />
        <Route path="/my/like" element={<UserLikePage />} />
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
            <div
              css={css`
                padding-top: 56px;
              `}
            >
              <ErrorBoundary FallbackComponent={ErrorResult}>
                <Router />
              </ErrorBoundary>
            </div>
          </BrowserRouter>
        </ThemeProvider>

        <Toaster />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </HelmetProvider>
  );
};

export default App;
