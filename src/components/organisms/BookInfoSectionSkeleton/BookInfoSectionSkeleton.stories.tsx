import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import BookInfoSectionSkeleton from '.';

const meta = {
  title: 'common/organisms/BookInfoSectionSkeleton',
  component: BookInfoSectionSkeleton,
} satisfies Meta<typeof BookInfoSectionSkeleton>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {
  args: {},
};
