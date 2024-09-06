import type { Meta, StoryObj } from '@storybook/react';
import { useUserStore } from '@/store/user';
import { MockUser } from '@/mocks/data';
import Header from '@components/common/header/index';

const meta = {
  title: 'common/Header',
  component: Header,
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LoggedOut: Story = {
  decorators: [
    (Story) => {
      const state = useUserStore.getState();
      useUserStore.setState({ ...state, isLogin: false, user: null });
      return <Story />;
    },
  ],
};

export const LoggedIn: Story = {
  decorators: [
    (Story) => {
      const state = useUserStore.getState();
      useUserStore.setState({ ...state, isLogin: true, user: MockUser });
      return <Story />;
    },
  ],
};
