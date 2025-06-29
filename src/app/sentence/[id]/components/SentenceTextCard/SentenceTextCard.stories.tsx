import { MockSentence } from '@/mocks/data';
import type { Meta, StoryObj } from '@storybook/nextjs';
import SentenceTextCard from '.';

const meta = {
  title: 'page/sentence-detail/SentenceTextCard',
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
