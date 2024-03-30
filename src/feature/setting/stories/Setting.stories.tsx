import type { Meta, StoryObj } from '@storybook/react';
import { useUserStore } from '@/store/user';
import { MockUser } from '@/mocks/data';
import Setting from '../SettingPage';

const meta = {
  title: 'Setting/Setting',
  component: Setting,
} satisfies Meta<typeof Setting>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  decorators: [
    (Story) => {
      const state = useUserStore.getState();
      useUserStore.setState({ ...state, isLogin: true, user: MockUser });
      return <Story />;
    },
  ],
};
