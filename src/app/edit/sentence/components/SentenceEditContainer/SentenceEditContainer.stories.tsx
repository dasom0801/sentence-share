import { MockSentence } from '@/mocks/data';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect } from 'storybook/test';
import SentenceEditContainer from './';

const meta = {
  title: 'page/edit/sentence/SentenceEditContainer',
  component: SentenceEditContainer,
} satisfies Meta<typeof SentenceEditContainer>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {
  args: {},
};

export const SelectedSentence: Story = {
  args: {
    sentence: MockSentence,
  },
  play: async ({ canvas, step, args }) => {
    await step('전달 받은 문장이 화면에 렌더링되어야 한다.', async () => {
      if (args.sentence) {
        expect(canvas.getByText(args.sentence.book.title)).toBeInTheDocument();
        const textarea = canvas.getByRole('textbox');
        expect(textarea).toHaveValue(args.sentence.content);
      }
    });
  },
};
