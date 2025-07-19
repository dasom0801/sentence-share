import { getRouter } from '@storybook/nextjs-vite/navigation.mock';
import type { Meta, StoryObj } from '@storybook/react';
import { expect, screen } from 'storybook/test';
import MySentenceCardButtons from './';

const meta = {
  title: 'page/my/sentence/MySentenceCardButtons',
  component: MySentenceCardButtons,
  args: {
    sentenceId: '1',
  },
} satisfies Meta<typeof MySentenceCardButtons>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {
  play: async ({ canvas, step, userEvent, args }) => {
    await step('수정 버튼을 클릭하면 수정 페이지로 이동한다.', async () => {
      const editButton = canvas.getByRole('button', { name: '수정' });
      await userEvent.click(editButton);
      expect(getRouter().push).toHaveBeenCalledWith(
        `/edit/sentence/${args.sentenceId}`,
      );
    });
    await step(
      '삭제 버튼을 클릭하면 삭제 여부를 묻는 Alert이 열린다.',
      async () => {
        const deleteButton = canvas.getByRole('button', { name: '삭제' });
        await userEvent.click(deleteButton);
        expect(screen.getByRole('dialog')).toBeInTheDocument();
        // dialog 닫기
        await userEvent.click(screen.getByRole('button', { name: '취소' }));
      },
    );
  },
};
