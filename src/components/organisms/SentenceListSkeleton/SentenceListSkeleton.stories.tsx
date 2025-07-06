import type { Meta, StoryObj } from '@storybook/react';
import { expect } from 'storybook/test';
import SentenceListSkeleton from './';

const meta = {
  title: 'common/organisms/SentenceListSkeleton',
  component: SentenceListSkeleton,
  args: {
    length: 12,
  },
} satisfies Meta<typeof SentenceListSkeleton>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {
  play: ({ canvas, step, args }) => {
    step('전달된 length 값만큼 리스트 아이템이 렌더링된다.', () => {
      expect(canvas.getAllByRole('listitem').length).toBe(args.length);
    });
  },
};
