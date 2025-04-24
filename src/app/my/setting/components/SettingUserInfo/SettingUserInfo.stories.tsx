import { MockUser } from '@/mocks/data';
import type { Meta, StoryObj } from '@storybook/react';
import SettingUserInfo from '.';
const meta = {
  title: 'page/setting/SettingUserInfo',
  component: SettingUserInfo,
} satisfies Meta<typeof SettingUserInfo>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {
  args: {
    user: MockUser,
  },
};
