import { MockUser } from '@/mocks/data';
import { useUserStore } from '@/store/user';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import HeaderMenu from '.';

const meta = {
  title: 'layout/HeaderMenu',
  component: HeaderMenu,
  args: {},
} satisfies Meta<typeof HeaderMenu>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Login: Story = {
  render: () => {
    const state = useUserStore.getState();
    useUserStore.setState({ ...state, user: MockUser });
    return <HeaderMenu />;
  },
};

export const Logout: Story = {
  render: () => {
    const state = useUserStore.getState();
    useUserStore.setState({ ...state, user: null });
    return <HeaderMenu />;
  },
};
