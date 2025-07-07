import { getRouter } from '@storybook/nextjs-vite/navigation.mock';
import type { Meta, StoryObj } from '@storybook/react';
import { expect } from 'storybook/test';
import MySentenceEmpty from './';

const meta = {
  title: 'my/sentence/MySentenceEmpty',
  component: MySentenceEmpty,
} satisfies Meta<typeof MySentenceEmpty>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {
  args: {},
  play: async ({ canvas, step, userEvent }) => {
    await step('목록이 비어있다는 안내 문구가 표시된다.', () => {
      expect(canvas.getByText('문장이 없습니다.')).toBeInTheDocument();
      expect(
        canvas.getByText('내가 좋아하는 책 속의 문장을 모두와 공유해보세요.'),
      ).toBeInTheDocument();
    });

    await step('작성하기 버튼을 클릭하면 작성 페이지로 이동한다.', async () => {
      const button = canvas.getByRole('button', { name: '작성하기' });
      await userEvent.click(button);
      expect(getRouter().push).toHaveBeenCalledWith('/edit/sentence');
    });
  },
};
