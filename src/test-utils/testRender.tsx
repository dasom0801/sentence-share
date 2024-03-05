import React from 'react';
import { RenderOptions, render as tlrRender } from '@testing-library/react';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

// 컴포넌트를 QueryClientProvider로 감싸서 렌더링하는 함수
const renderWithReactQuery = (
  ui: React.ReactNode,
  options?: Omit<RenderOptions, 'queries'>
) => {
  const queryClient = createTestQueryClient();
  return tlrRender(
    <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>,
    options
  );
};

const wrapperWithReactQuery = () => {
  const queryClient = createTestQueryClient();
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export { renderWithReactQuery, wrapperWithReactQuery };
