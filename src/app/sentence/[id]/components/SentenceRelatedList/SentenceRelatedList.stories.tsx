import { MockBook } from '@/mocks/data';
import { handleGetBookSentence } from '@/mocks/handlers';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import SentenceRelatedList from './';

const meta = {
  title: 'page/sentence-detail/SentenceRelatedList',
  component: SentenceRelatedList,
} satisfies Meta<typeof SentenceRelatedList>;

const sentenceId = 'current-sentence-id';
const limit = 6;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {
  args: {
    sentenceId,
    book: MockBook,
  },
  parameters: {
    msw: {
      handlers: [handleGetBookSentence(sentenceId, limit)],
    },
  },
  // play: async ({ canvas, step, userEvent }) => {
  //   await step('책 제목이 표시된다.', async () => {
  //     const heading = await canvas.findByRole('heading', {
  //       name: `'${MockBook.title}' 속의 문장들`,
  //     });
  //     expect(heading).toBeInTheDocument();
  //   });
  //   await step(
  //     'sentenceId에 해당하는 문장은 화면에 표시되지 않는다.',
  //     async () => {
  //       const allLinks = await canvas.findAllByRole('link');
  //       const targetSentence = allLinks.find(
  //         (link) => link.getAttribute('href') === `/sentence/${sentenceId}`,
  //       );
  //       expect(targetSentence).not.toBeDefined();
  //     },
  //   );
  // },
};

export const EMPTY: Story = {
  args: {
    sentenceId,
    book: MockBook,
  },
  parameters: {
    msw: {
      handlers: [handleGetBookSentence(sentenceId, 0)],
    },
  },
  // play: async ({ canvas, step }) => {
  //   await step('목록이 없을 때 아무것도 표시하지 않는다.', () => {
  //     const title = canvas.queryByRole('heading');
  //     expect(title).not.toBeInTheDocument();
  //     const links = canvas.queryAllByRole('link');
  //     expect(links.length).toBe(0);
  //   });
  // },
};
