import type { Meta, StoryObj } from '@storybook/react';
import BookListItemSkeleton from '.';

const meta = {
  title: 'page/edit/BookListItemSkeleton',
  component: BookListItemSkeleton,
} satisfies Meta<typeof BookListItemSkeleton>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {
  args: {},
};
