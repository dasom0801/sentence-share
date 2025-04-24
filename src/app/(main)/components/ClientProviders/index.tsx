'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { MUI_THEME } from '@/constants';
import { ThemeProvider } from '@mui/material';

const queryClient = new QueryClient();
export default function ClientProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={MUI_THEME}>
          {children}
          <Toaster />
        </ThemeProvider>
      </QueryClientProvider>
    </>
  );
}
