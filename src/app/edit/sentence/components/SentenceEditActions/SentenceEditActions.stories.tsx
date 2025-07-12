import { getRouter } from '@storybook/nextjs-vite/navigation.mock';
import type { Meta, StoryObj } from '@storybook/react';
import { expect, fn, screen } from 'storybook/test';
import SentenceEditActions from './';

const meta = {
  title: 'page/edit/sentence/SentenceEditActions',
  component: SentenceEditActions,
} satisfies Meta<typeof SentenceEditActions>;

export default meta;
type Story = StoryObj<typeof meta>;
export const PostSentence: Story = {
  args: {
    mode: 'post',
    pending: false,
    handleSubmit: fn(),
  },
  play: async ({ canvas, step, userEvent, args }) => {
    await step('취소 버튼을 클릭하면 이전 페이지로 돌아간다.', async () => {
      const cancelButton = canvas.getByRole('button', { name: '취소' });
      await userEvent.click(cancelButton);
      expect(getRouter().back).toBeCalled();
    });

    await step(
      '등록 버튼을 클릭하면 등록 여부를 묻는 Dialog가 표시된다.',
      async () => {
        const postButton = canvas.getByRole('button', { name: '등록' });
        await userEvent.click(postButton);
        expect(screen.getByRole('dialog')).toBeInTheDocument();
        expect(
          screen.getByText('작성한 내용을 등록하시겠습니까?'),
        ).toBeInTheDocument();
      },
    );
    await step(
      'Dialog의 등록 버튼을 클릭하면 handleConfirm이 호출된다.',
      async () => {
        const confirmButton = screen.getByRole('button', { name: '등록' });
        await userEvent.click(confirmButton);
        expect(args.handleSubmit).toHaveBeenCalledOnce();
      },
    );
  },
};

export const ModifySentence: Story = {
  args: {
    mode: 'modify',
    pending: false,
    handleSubmit: fn(),
  },
  play: async ({ canvas, step, userEvent, args }) => {
    await step(
      '수정 버튼을 클릭하면 등록 여부를 묻는 Dialog가 표시된다.',
      async () => {
        const modifyButton = canvas.getByRole('button', { name: '수정' });
        await userEvent.click(modifyButton);
        expect(
          screen.getByText('내용을 수정하시겠습니까?'),
        ).toBeInTheDocument();
      },
    );
    await step(
      'Dialog의 수정 버튼을 클릭하면 handleConfirm이 호출된다.',
      async () => {
        const modifyButton = screen.getByRole('button', { name: '수정' });
        await userEvent.click(modifyButton);
        expect(args.handleSubmit).toHaveBeenCalledOnce();
      },
    );
  },
};

export const PendingStatus: Story = {
  args: {
    mode: 'post',
    pending: true,
    handleSubmit: fn(),
  },
  play: ({ canvas, step }) => {
    step('pending 상태에서 버튼들은 disabled가 된다.', () => {
      const cancelButton = canvas.getByRole('button', { name: '취소' });
      const confirmButton = canvas.getByRole('button', { name: '등록' });
      [cancelButton, confirmButton].forEach((button) => {
        expect(button).toHaveAttribute('disabled');
      });
    });
  },
};
