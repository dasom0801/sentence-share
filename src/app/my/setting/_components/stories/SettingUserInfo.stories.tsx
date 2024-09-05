import type { Meta, StoryObj } from '@storybook/react';
import SettingUserInfo from '../setting-user-info';
import { MockUser } from '@/mocks/data';
const meta = {
  title: 'setting/SettingUserInfo',
  component: SettingUserInfo,
} satisfies Meta<typeof SettingUserInfo>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {
  args: {
    user: MockUser,
  },
};
