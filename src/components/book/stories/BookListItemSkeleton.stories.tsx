import type { Meta, StoryObj } from '@storybook/react';
import BookListItemSkeleton from '../BookListItemSkeleton';

const meta = {
  title: 'book/BookListItemSkeleton',
  component: BookListItemSkeleton,
  tags: ['autodocs'],
} satisfies Meta<typeof BookListItemSkeleton>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {
  args: {},
};
