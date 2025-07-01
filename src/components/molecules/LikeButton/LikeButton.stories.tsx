import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import LikeButton from '.';

const meta = {
  title: 'common/molecules/LikeButton',
  component: LikeButton,
} satisfies Meta<typeof LikeButton>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Unlike: Story = {
  args: {
    id: '1',
    isLiked: false,
  },
};

export const Like: Story = {
  args: {
    id: '1',
    isLiked: true,
  },
};
