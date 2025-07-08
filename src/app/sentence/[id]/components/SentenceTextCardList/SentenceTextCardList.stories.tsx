import { MockSentence } from '@/mocks/data';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { getRouter } from '@storybook/nextjs-vite/navigation.mock';
import { expect } from 'storybook/test';
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
  play: async ({ canvas, step, userEvent }) => {
    const listitems = canvas.getAllByRole('listitem');
    await step('목록이 화면에 렌더링된다.', () => {
      expect(listitems).toBeDefined();
      expect(listitems.length).toBe(6);
    });
    await step(
      '목록 아이템을 클릭하면 문장 상세 페이지로 이동한다.',
      async () => {
        const link = canvas
          .getAllByRole('link')
          .find((link) => link.getAttribute('href') === '/sentence/1');
        expect(link).toBeDefined();
        if (link) {
          await userEvent.click(link);
          expect(getRouter().push).toHaveBeenCalledWith(`/sentence/1`, {
            scroll: true,
          });
        }
      },
    );
  },
};
