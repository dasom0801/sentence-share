import type { Meta, StoryObj } from '@storybook/react';
import SettingUserInfo from '../SettingUserInfo';
const meta = {
  title: 'setting/SettingUserInfo',
  component: SettingUserInfo,
  tags: ['autodocs'],
} satisfies Meta<typeof SettingUserInfo>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {
  args: {
    user: {
      name: 'UserName',
    },
    isPending: false,
  },
};

export const Pending: Story = {
  args: {
    user: {
      name: 'UserName',
    },
    isPending: true,
  },
};
