import type { Meta, StoryObj } from '@storybook/react';
import BookInfoSectionSkeleton from '../book-info-section-skeleton';

const meta = {
  title: 'book/BookInfoSectionSkeleton',
  component: BookInfoSectionSkeleton,
} satisfies Meta<typeof BookInfoSectionSkeleton>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {
  args: {},
};
