import { MockUser } from '@/mocks/data';
import type { Meta, StoryObj } from '@storybook/nextjs';
import UserInfo from '.';

const meta = {
  title: 'common/molecules/UserInfo',
  component: UserInfo,
} satisfies Meta<typeof UserInfo>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {
  args: {
    user: MockUser,
  },
};
