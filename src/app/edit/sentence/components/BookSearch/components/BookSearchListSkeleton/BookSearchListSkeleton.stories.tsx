import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect } from 'storybook/test';
import BookSearchListSkeleton from '.';

const meta = {
  title: 'page/edit/sentence/BookSearchListSkeleton',
  component: BookSearchListSkeleton,
  args: {
    length: 3,
  },
} satisfies Meta<typeof BookSearchListSkeleton>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {
  play: async ({ canvas, step, args }) => {
    await step('length 만큼 목록을 렌더링한다', () => {
      expect(canvas.getAllByRole('listitem').length).toEqual(args.length);
    });
  },
};
