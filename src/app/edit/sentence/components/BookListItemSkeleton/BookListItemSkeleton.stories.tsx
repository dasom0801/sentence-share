import BookListItemSkeleton from '@/app/edit/sentence/components/BookListItemSkeleton';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'page/edit/BookListItemSkeleton',
  component: BookListItemSkeleton,
} satisfies Meta<typeof BookListItemSkeleton>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {
  args: {},
};
