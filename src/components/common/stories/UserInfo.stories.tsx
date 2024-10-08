import type { Meta, StoryObj } from '@storybook/react';
import UserInfo from '../user-info';
import { MockUser } from '@/mocks/data';

const meta = {
  title: 'common/UserInfo',
  component: UserInfo,
} satisfies Meta<typeof UserInfo>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {
  args: {
    user: MockUser,
  },
};
