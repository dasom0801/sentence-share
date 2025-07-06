import { MockSentence } from '@/mocks/data';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect } from 'storybook/test';
import SentenceLikeCardList from '.';

const meta = {
  title: 'common/organisms/SentenceLikeCardList',
  component: SentenceLikeCardList,
  args: {
    list: Array.from({ length: 12 }).map((_, index) => ({
      ...MockSentence,
      _id: `${index}`,
    })),
  },
} satisfies Meta<typeof SentenceLikeCardList>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {
  play: ({ canvas, step, args }) => {
    step('list의 길이만큼 리스트 아이템이 렌더링된다.', () => {
      expect(canvas.getAllByRole('listitem').length).toBe(args.list.length);
    });

    step('LikeButton이 렌더링된다.', () => {
      expect(
        canvas.getAllByRole('button', { name: '좋아요' })[0],
      ).toBeInTheDocument();
    });
  },
};

export const HideBook: Story = {
  args: {
    ...Default.args,
    showBook: false,
  },
  play: ({ canvas, step }) => {
    step('책 정보가 숨김 처리되면 화면에 표시되지 않는다', () => {
      const listItem = canvas.getAllByRole('listitem')[0];
      expect(listItem).not.toHaveTextContent(MockSentence.book.title);
    });
  },
};

export const EmptyList: Story = {
  args: {
    list: [],
  },
  play: ({ canvas, step }) => {
    step('빈 list인 경우 아무것도 렌더링하지 않는다.', () => {
      expect(canvas.queryAllByRole('listitem').length).toBe(0);
    });
  },
};
