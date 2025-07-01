import { MockSentence } from '@/mocks/data';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import SentenceTextCardList from '.';

const meta = {
  title: 'page/sentence-detail/SentenceTextCardList',
  component: SentenceTextCardList,
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
