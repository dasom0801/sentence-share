import { MockUser } from '@/mocks/data';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import SettingUserInfo from '.';
const meta = {
  title: 'my/setting/SettingUserInfo',
  component: SettingUserInfo,
} satisfies Meta<typeof SettingUserInfo>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {
  args: {
    user: MockUser,
  },
};
