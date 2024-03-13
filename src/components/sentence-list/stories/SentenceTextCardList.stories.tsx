import type { Meta, StoryObj } from '@storybook/react';
import SentenceTextCardList from '../SentenceTextCardList';
import { MockSentence } from '@/test-utils/index.mock';
import { BrowserRouter } from 'react-router-dom';

const meta = {
  title: 'SentenceList/SentenceTextCardList',
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
  decorators: [
    (Story) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
};
