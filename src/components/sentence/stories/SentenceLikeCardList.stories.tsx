import type { Meta, StoryObj } from '@storybook/react';
import { MockSentence } from '@/mocks/data';
import SentenceLikeCardList from '../SentenceLikeCardList';

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
    onToggleLike: (id) => console.log(id),
  },
};

export const Loading: Story = {
  args: {
    list: Array.from({ length: 12 }).map((_, index) => ({
      ...MockSentence,
      _id: `${index}`,
    })),
    isLoading: true,
    onToggleLike: (id) => console.log(id),
  },
};

export const HideBook: Story = {
  args: {
    list: Array.from({ length: 12 }).map((_, index) => ({
      ...MockSentence,
      _id: `${index}`,
    })),
    isLoading: false,
    showBook: false,
    onToggleLike: (id) => console.log(id),
  },
};
