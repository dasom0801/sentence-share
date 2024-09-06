import type { Meta, StoryObj } from '@storybook/react';
import BookListItemSkeleton from '@components/book/book-list-item-skeleton';

const meta = {
  title: 'book/BookListItemSkeleton',
  component: BookListItemSkeleton,
} satisfies Meta<typeof BookListItemSkeleton>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {
  args: {},
};
