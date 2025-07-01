import { MockUser } from '@/mocks/data';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import SettingUserImage from '.';
const meta = {
  title: 'page/setting/SettingUserImage',
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
