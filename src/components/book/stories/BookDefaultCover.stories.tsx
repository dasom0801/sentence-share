import type { Meta, StoryObj } from '@storybook/react';
import BookDefaultCover from '../BookDefaultCover';

const meta = {
  title: 'Book/BookDefaultCover',
  component: BookDefaultCover,
} satisfies Meta<typeof BookDefaultCover>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {
  args: {},
};
