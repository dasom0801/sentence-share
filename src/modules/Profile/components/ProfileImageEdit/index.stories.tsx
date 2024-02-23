import type { Meta, StoryObj } from '@storybook/react';
import ProfileImageEdit from './';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
const meta = {
  title: 'profile/components/ProfileImageEdit',
  component: ProfileImageEdit,
  tags: ['autodocs'],
} satisfies Meta<typeof ProfileImageEdit>;

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
  decorators: (Story) => {
    return (
      <QueryClientProvider client={client}>
        <Story />
      </QueryClientProvider>
    );
  },
};
