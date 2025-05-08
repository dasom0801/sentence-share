'use client';

import { MUI_THEME } from '@/lib/mui/theme';
import { ThemeProvider } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';

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
