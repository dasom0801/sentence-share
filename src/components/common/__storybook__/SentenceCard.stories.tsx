import type { Meta, StoryObj } from '@storybook/react';
import SentenceCard from '../SentenceCard';
import {
  MockBook,
  MockSentence,
  MockUser,
} from '../../../test-utils/index.mock';
import { BrowserRouter } from 'react-router-dom';
const meta = {
  title: 'common/SentenceCard',
  component: SentenceCard,
  tags: ['autodocs'],
} satisfies Meta<typeof SentenceCard>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {
  args: {
    book: MockBook,
    author: MockUser,
    sentence: MockSentence,
    isLiked: false,
    toggleLike: () => console.log('click'),
  },
  decorators: (Story) => {
    return (
      <BrowserRouter>
        <div style={{ width: '50%' }}>
          <Story />
        </div>
      </BrowserRouter>
    );
  },
};

export const Liked: Story = {
  args: {
    book: MockBook,
    author: MockUser,
    sentence: MockSentence,
    isLiked: true,
    toggleLike: () => console.log('click'),
  },
  decorators: (Story) => {
    return (
      <BrowserRouter>
        <div style={{ width: '50%' }}>
          <Story />
        </div>
      </BrowserRouter>
    );
  },
};
