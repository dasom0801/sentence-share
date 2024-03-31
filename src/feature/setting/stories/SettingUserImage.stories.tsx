import type { Meta, StoryObj } from '@storybook/react';
import SettingUserImage from '../SettingUserImage';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MockUser } from '@/mocks/data';
const meta = {
  title: 'setting/SettingUserImage',
  component: SettingUserImage,
} satisfies Meta<typeof SettingUserImage>;

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
  args: {
    user: MockUser,
  },
};
