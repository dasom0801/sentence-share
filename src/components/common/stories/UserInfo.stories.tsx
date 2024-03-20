import type { Meta, StoryObj } from '@storybook/react';
import UserInfo from '../UserInfo';
import { MockUser } from '@/mocks/data';

const meta = {
  title: 'common/UserInfo',
  component: UserInfo,
  tags: ['autodocs'],
} satisfies Meta<typeof UserInfo>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {
  args: {
    user: MockUser,
  },
};
