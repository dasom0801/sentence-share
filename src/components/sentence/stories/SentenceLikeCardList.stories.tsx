import type { Meta, StoryObj } from '@storybook/react';
import { MockSentence } from '@/mocks/data';
import SentenceLikeCardList from '@components/sentence/sentence-like-card-list';

const meta = {
  title: 'sentence/SentenceLikeCardList',
  component: SentenceLikeCardList,
} satisfies Meta<typeof SentenceLikeCardList>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {
  args: {
    list: Array.from({ length: 12 }).map((_, index) => ({
      ...MockSentence,
      _id: `${index}`,
    })),
  },
};

export const HideBook: Story = {
  args: {
    list: Array.from({ length: 12 }).map((_, index) => ({
      ...MockSentence,
      _id: `${index}`,
    })),
    showBook: false,
  },
};
