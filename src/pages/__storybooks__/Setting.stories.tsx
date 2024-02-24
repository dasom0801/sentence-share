import type { Meta, StoryObj } from '@storybook/react';
import Setting from '../Setting';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
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
        <Story />
      </BrowserRouter>
    </QueryClientProvider>
  ),
};
