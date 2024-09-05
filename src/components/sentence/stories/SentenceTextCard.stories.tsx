import type { Meta, StoryObj } from '@storybook/react';
import { MockSentence } from '@/mocks/data';
import SentenceTextCard from '../sentence-text-card';

const meta = {
  title: 'Sentence/SentenceTextCard',
  component: SentenceTextCard,
} satisfies Meta<typeof SentenceTextCard>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {
  args: {
    text: MockSentence.content,
    bookTitle: MockSentence.book.title,
    bookAuthor: MockSentence.book.author,
  },
};
