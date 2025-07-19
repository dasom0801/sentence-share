import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { getRouter } from '@storybook/nextjs-vite/navigation.mock';
import { Canvas } from 'storybook/internal/csf';
import { expect, fn, screen } from 'storybook/test';
import {
  edit,
  empty,
  pending,
  valid,
  withMockedSentenceEditContext,
} from '../../__mocks__';
import SentenceEditActions from './';

const meta = {
  title: 'page/edit/sentence/SentenceEditActions',
  component: SentenceEditActions,
} satisfies Meta<typeof SentenceEditActions>;

export default meta;
type Story = StoryObj<typeof meta>;

const getButtons = (canvas: Canvas) => {
  const cancelButton = () => canvas.getByRole('button', { name: '취소' });
  const submitButton = () => canvas.getByRole('button', { name: '등록' });
  const editButton = () => canvas.getByRole('button', { name: '수정' });
  return {
    cancelButton,
    submitButton,
    editButton,
  };
};

const mockHandleSubmit = fn();

export const Default: Story = {
  decorators: [withMockedSentenceEditContext(empty)],
  play: async ({ canvas, step }) => {
    await step('기본적으로 버튼들은 Disabled 상태가 되어야한다.', () => {
      const { cancelButton, submitButton } = getButtons(canvas);

      expect(cancelButton()).toBeDisabled();
      expect(submitButton()).toBeDisabled();
    });
  },
};

export const ValidState: Story = {
  decorators: [withMockedSentenceEditContext(valid)],
  play: async ({ canvas, step }) => {
    await step(
      '책을 선택하고 값을 입력했을 때 버튼은 Enabled 상태가 되어야한다.',
      () => {
        const { cancelButton, submitButton } = getButtons(canvas);

        expect(cancelButton()).toBeEnabled();
        expect(submitButton()).toBeEnabled();
      },
    );
  },
};

export const EditMode: Story = {
  decorators: [withMockedSentenceEditContext(edit)],
  play: async ({ canvas, step }) => {
    await step('수정 모드에서는 [수정]버튼이 표시되어야 한다.', () => {
      const { editButton } = getButtons(canvas);
      expect(editButton()).toBeEnabled();
    });
  },
};

export const PendingState: Story = {
  decorators: [withMockedSentenceEditContext(pending)],
  play: async ({ canvas, step }) => {
    await step('로딩 중일 때는 버튼들은 Disabled 상태가 되어야한다.', () => {
      const { cancelButton, submitButton } = getButtons(canvas);

      expect(cancelButton()).toBeDisabled();
      expect(submitButton()).toBeDisabled();
    });
  },
};

export const CandleButtonClick: Story = {
  decorators: [withMockedSentenceEditContext(valid)],
  play: async ({ canvas, step, userEvent }) => {
    await step('취소 버튼을 클릭하면 이전 페이지로 돌아가야한다.', async () => {
      const { cancelButton } = getButtons(canvas);
      await userEvent.click(cancelButton());
      expect(getRouter().back).toHaveBeenCalled();
    });
  },
};

export const SubmitDialog: Story = {
  decorators: [
    withMockedSentenceEditContext({ ...valid, handleSubmit: mockHandleSubmit }),
  ],
  play: async ({ canvas, step, userEvent }) => {
    await step(
      '등록 버튼을 클릭하면 등록 여부를 묻는 Dialog가 표시되어야 한다.',
      async () => {
        const { submitButton } = getButtons(canvas);
        await userEvent.click(submitButton());
        expect(screen.getByRole('dialog')).toBeInTheDocument();
        expect(
          screen.getByText('작성한 내용을 등록하시겠습니까?'),
        ).toBeInTheDocument();
      },
    );

    await step(
      'Dialog의 등록 버튼을 클릭하면 handleSubmit이 호출되어야 한다.',
      async () => {
        const confirmButton = screen.getByRole('button', { name: '등록' });
        await userEvent.click(confirmButton);
        expect(mockHandleSubmit).toHaveBeenCalledOnce();
      },
    );
  },
};

export const EditDialog: Story = {
  decorators: [
    withMockedSentenceEditContext({ ...edit, handleSubmit: mockHandleSubmit }),
  ],
  play: async ({ canvas, step, userEvent }) => {
    await step(
      '수정 버튼을 클릭하면 등록 여부를 묻는 Dialog가 표시되어야 한다.',
      async () => {
        const { editButton } = getButtons(canvas);
        await userEvent.click(editButton());
        expect(
          screen.getByText('내용을 수정하시겠습니까?'),
        ).toBeInTheDocument();
      },
    );
    await step(
      'Dialog의 수정 버튼을 클릭하면 handleSubmit이 호출되어야 한다.',
      async () => {
        const modifyButton = screen.getByRole('button', { name: '수정' });
        await userEvent.click(modifyButton);
        expect(mockHandleSubmit).toHaveBeenCalledOnce();
      },
    );
  },
};
