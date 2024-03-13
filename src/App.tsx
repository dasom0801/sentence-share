import { Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { HelmetProvider, Helmet } from 'react-helmet-async';

import { GlobalStyles, Header } from '@/components';

const queryClient = new QueryClient();

const App = () => {
  return (
    <HelmetProvider>
      <Helmet>
        <title>Sentence Share</title>
      </Helmet>
      <QueryClientProvider client={queryClient}>
        <GlobalStyles />
        <Header />
        <Outlet />

        <Toaster />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </HelmetProvider>
  );
};

export default App;
