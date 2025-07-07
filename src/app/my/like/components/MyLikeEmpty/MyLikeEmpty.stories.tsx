import { getRouter } from '@storybook/nextjs-vite/navigation.mock';
import type { Meta, StoryObj } from '@storybook/react';
import { expect } from 'storybook/test';
import MyLikeEmpty from './';

const meta = {
  title: 'page/like/MyLikeEmpty',
  component: MyLikeEmpty,
} satisfies Meta<typeof MyLikeEmpty>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {
  args: {},
  play: async ({ canvas, step, userEvent }) => {
    await step('목록이 비어있다는 안내 문구가 표시된다.', () => {
      expect(canvas.getByText('문장이 없습니다.')).toBeInTheDocument();
      expect(
        canvas.getByText('다른 사람들이 공유한 책 속의 문장을 확인해 보세요!'),
      ).toBeInTheDocument();
    });

    await step(
      '목록 보기 버튼을 클릭하면 메인 페이지로 이동한다.',
      async () => {
        const button = canvas.getByRole('button', { name: '목록 보기' });
        await userEvent.click(button);
        expect(getRouter().push).toHaveBeenCalledWith('/');
      },
    );
  },
};
