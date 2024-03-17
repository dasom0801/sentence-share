import type { Meta, StoryObj } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';
import SentenceLikeCardList from '../SentenceLikeCardList';
import { MockSentence } from '../../../test-utils/index.mock';
const meta = {
  title: 'sentence/SentenceLikeCardList',
  component: SentenceLikeCardList,
  tags: ['autodocs'],
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
  decorators: (Story) => {
    return (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    );
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
  decorators: (Story) => {
    return (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    );
  },
};
