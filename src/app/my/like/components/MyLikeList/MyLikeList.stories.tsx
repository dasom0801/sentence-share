import { MockSentence } from '@/mocks/data';
import type { Meta, StoryObj } from '@storybook/react';
import { expect } from 'storybook/test';
import MyLikeList from './';

const meta = {
  title: 'page/like/MyLikeList',
  component: MyLikeList,
} satisfies Meta<typeof MyLikeList>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {
  args: {
    total: 100,
    list: Array.from({ length: 10 }, () => MockSentence),
    totalPages: 10,
  },
  play: async ({ canvas, step, args }) => {
    await step('제목에 (total)이 표시된다.', () => {
      expect(
        canvas.getByRole('heading', {
          name: `내가 좋아한 문장 (${args.total})`,
        }),
      ).toBeInTheDocument();
    });

    await step('list의 길이 만큼 문장 목록이 그려진다.', () => {
      const allLis = canvas.getAllByRole('listitem');
      // 페이지네이션 제외
      const sentenceList = allLis.filter((li) => !li.closest('nav'));
      expect(sentenceList.length).toBe(args.list.length);
    });
  },
};

export const EmptyList: Story = {
  args: {
    total: 0,
    list: [],
    totalPages: 0,
  },
  play: async ({ canvas, step, args }) => {
    await step('제목에 (total)이 표시되지 않는다.', () => {
      expect(canvas.queryByText(`(${args.total})`)).not.toBeInTheDocument();
    });

    await step('좋아요한 문장이 없다는 안내가 출력된다.', () => {
      expect(canvas.getByText('문장이 없습니다.')).toBeInTheDocument();
    });
  },
};
