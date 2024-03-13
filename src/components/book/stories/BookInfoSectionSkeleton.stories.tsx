import type { Meta, StoryObj } from '@storybook/react';
import BookInfoSectionSkeleton from '../BookInfoSectionSkeleton';

const meta = {
  title: 'book/BookInfoSectionSkeleton',
  component: BookInfoSectionSkeleton,
  tags: ['autodocs'],
} satisfies Meta<typeof BookInfoSectionSkeleton>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {
  args: {},
};
