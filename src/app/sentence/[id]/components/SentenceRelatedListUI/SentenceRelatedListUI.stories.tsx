import { MockBook, MockSentence } from '@/mocks/data';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect } from 'storybook/test';
import SentenceRelatedListUI from './';

const meta = {
  title: 'page/sentence/[id]/SentenceRelatedListUI',
  component: SentenceRelatedListUI,
} satisfies Meta<typeof SentenceRelatedListUI>;

const sentenceId = 'current-sentence-id';
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {
  args: {
    excludeSentenceId: sentenceId,
    bookTitle: MockBook.title,
    sentences: [
      { ...MockSentence, _id: sentenceId, content: '목록에서 제외될 문장' },
      ...Array.from({ length: 6 }, (_, id) => ({
        ...MockSentence,
        _id: id.toString(),
        content: `Sentence ${id}`,
      })),
    ],
  },
  play: async ({ canvas, step }) => {
    await step('책 제목이 표시된다.', async () => {
      const heading = await canvas.findByRole('heading', {
        name: `'${MockBook.title}' 속의 문장들`,
      });
      expect(heading).toBeInTheDocument();
    });
    await step(
      'sentenceId에 해당하는 문장은 화면에 표시되지 않는다.',
      async () => {
        const allLinks = await canvas.findAllByRole('link');
        const targetSentence = allLinks.find(
          (link) => link.getAttribute('href') === `/sentence/${sentenceId}`,
        );
        expect(targetSentence).not.toBeDefined();
        expect(canvas.queryByText('목록에서 제외될 문장')).not.toBeDefined();
      },
    );
  },
};

export const EMPTY: Story = {
  args: {
    excludeSentenceId: sentenceId,
    bookTitle: MockBook.title,
    sentences: [],
  },
  play: async ({ canvas, step }) => {
    await step('목록이 없을 때 아무것도 표시하지 않는다.', () => {
      const title = canvas.queryByRole('heading');
      expect(title).not.toBeInTheDocument();
      const links = canvas.queryAllByRole('link');
      expect(links.length).toBe(0);
    });
  },
};
