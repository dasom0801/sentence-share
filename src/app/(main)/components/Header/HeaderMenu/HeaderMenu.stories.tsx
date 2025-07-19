import { MockUser } from '@/mocks/data';
import { useUserStore } from '@/store/user';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import HeaderMenu from '.';

const meta = {
  title: 'page/main/HeaderMenu',
  component: HeaderMenu,
  args: {},
} satisfies Meta<typeof HeaderMenu>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Login: Story = {
  decorators: [
    (Story) => {
      const state = useUserStore.getState();
      useUserStore.setState({ ...state, user: MockUser });
      return <Story />;
    },
  ],
};

export const Logout: Story = {
  decorators: [
    (Story) => {
      const state = useUserStore.getState();
      useUserStore.setState({ ...state, user: null });
      return <Story />;
    },
  ],
};
