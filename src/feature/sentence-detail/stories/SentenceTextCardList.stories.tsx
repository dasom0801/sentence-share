import type { Meta, StoryObj } from '@storybook/react';
import { MockSentence } from '@/mocks/data';
import SentenceTextCardList from '../SentenceTextCardList';

const meta = {
  title: 'SentenceDetail/SentenceTextCardList',
  component: SentenceTextCardList,
  tags: ['autodocs'],
} satisfies Meta<typeof SentenceTextCardList>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {
  args: {
    sentences: Array.from({ length: 6 }).map((_, index) => ({
      ...MockSentence,
      _id: `${index}`,
    })),
  },
};
