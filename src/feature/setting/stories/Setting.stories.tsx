import type { Meta, StoryObj } from '@storybook/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';

import Setting from '../SettingPage';
import { HelmetProvider } from 'react-helmet-async';

const meta = {
  title: 'Setting/Setting',
  component: Setting,
  tags: ['autodocs'],
} satisfies Meta<typeof Setting>;

export default meta;
type Story = StoryObj<typeof meta>;
const client = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});
export const Default: Story = {
  decorators: (Story) => (
    <QueryClientProvider client={client}>
      <BrowserRouter>
        <HelmetProvider>
          <Story />
        </HelmetProvider>
      </BrowserRouter>
    </QueryClientProvider>
  ),
};
