import type { Meta, StoryObj } from '@storybook/react';
import ProfileInfoEdit from './';
const meta = {
  title: 'Profile/components/ProfileInfoEdit',
  component: ProfileInfoEdit,
  tags: ['autodocs'],
} satisfies Meta<typeof ProfileInfoEdit>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {
  args: {
    user: {
      name: 'UserName',
    },
  },
};
