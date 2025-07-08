import { MockSentence } from '@/mocks/data';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect } from 'storybook/test';
import SentenceTextCard from '.';

const meta = {
  title: 'page/sentence-detail/SentenceTextCard',
  component: SentenceTextCard,
  args: {
    text: MockSentence.content,
    bookTitle: MockSentence.book.title,
    bookAuthor: MockSentence.book.author,
  },
} satisfies Meta<typeof SentenceTextCard>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {
  play: ({ canvas, step }) => {
    step('문장 정보가 화면에 렌더링된다.', () => {
      expect(canvas.getByText(MockSentence.content)).toBeInTheDocument();
      const bookInfo = `${MockSentence.book.title} - ${MockSentence.book.author}`;
      expect(canvas.getByText(bookInfo)).toBeInTheDocument();
    });
  },
};
