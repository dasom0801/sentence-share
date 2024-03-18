import React, { ReactNode } from 'react';
import { RenderOptions, render as rtlRender } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, RouterProps } from 'react-router-dom';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

// https://tanstack.com/query/v4/docs/framework/react/guides/testing
const testQueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // ✅ turns retries off
      retry: false,
    },
  },
});

type TestRenderOptions = {
  routerProps?: RouterProps;
  renderOptions?: RenderOptions;
};

const render = (ui: ReactNode, options: TestRenderOptions = {}) => {
  const user = userEvent.setup();
  const { routerProps = {}, renderOptions = {} } = options;
  return {
    user,
    ...rtlRender(
      <QueryClientProvider client={testQueryClient}>
        <MemoryRouter {...routerProps}>{ui}</MemoryRouter>
      </QueryClientProvider>,
      renderOptions
    ),
  };
};

const wrapperWithReactQuery = () => {
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={testQueryClient}>
      {children}
    </QueryClientProvider>
  );
};

export { render, wrapperWithReactQuery };
