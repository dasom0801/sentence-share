import type { Meta, StoryObj } from '@storybook/react';
import Header from '../Header';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { QUERY_KEY } from '../../../lib/hooks/useUserQuery';

const meta = {
  title: 'base/Header',
  component: Header,
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

const client = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

export const LoggedOut: Story = {
  decorators: [
    (Story) => {
      client.setQueryData(QUERY_KEY, () => null);
      return (
        <QueryClientProvider client={client}>
          <BrowserRouter>
            <Story />
          </BrowserRouter>
        </QueryClientProvider>
      );
    },
  ],
};

export const LoggedIn: Story = {
  decorators: [
    (Story) => {
      client.setQueryData(QUERY_KEY, () => ({
        _id: 'id',
        name: 'userName',
        profileUrl: undefined,
      }));
      return (
        <QueryClientProvider client={client}>
          <BrowserRouter>
            <Story />
          </BrowserRouter>
        </QueryClientProvider>
      );
    },
  ],
};
