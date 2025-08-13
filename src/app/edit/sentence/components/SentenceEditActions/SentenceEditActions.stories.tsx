import { MockSentence } from '@/mocks/data';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { getRouter } from '@storybook/nextjs-vite/navigation.mock';
import { Canvas } from 'storybook/internal/csf';
import { expect, fn, screen, waitFor, within } from 'storybook/test';
import {
  edit,
  empty,
  pending,
  valid,
  withMockedSentenceEditContext,
} from '../../__mocks__';
import { SentenceEditProvider } from '../../contexts';
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
  const loadingButton = () =>
    canvas.getByRole('button', { name: '처리 중...' });
  return {
    cancelButton,
    submitButton,
    editButton,
    loadingButton,
  };
};

// 기본 상태 (빈 폼) - 버튼들이 비활성화되어야 함
export const EmptyForm: Story = {
  decorators: [withMockedSentenceEditContext(empty)],
  play: async ({ canvas, step }) => {
    await step('폼이 비어있을 때 모든 버튼이 비활성화되어야 한다', () => {
      const { cancelButton, submitButton } = getButtons(canvas);

      expect(cancelButton()).toBeDisabled();
      expect(submitButton()).toBeDisabled();
      expect(submitButton()).toHaveTextContent('등록');
    });
  },
};

// 유효한 상태 - 버튼들이 활성화되어야 함
export const ValidForm: Story = {
  decorators: [withMockedSentenceEditContext(valid)],
  play: async ({ canvas, step }) => {
    await step('폼이 유효할 때 모든 버튼이 활성화되어야 한다', () => {
      const { cancelButton, submitButton } = getButtons(canvas);

      expect(cancelButton()).toBeEnabled();
      expect(submitButton()).toBeEnabled();
      expect(submitButton()).toHaveTextContent('등록');
    });
  },
};

// 수정 모드 - 수정 버튼이 표시되어야 함
export const EditMode: Story = {
  decorators: [
    (Story) => (
      <SentenceEditProvider initialSentence={MockSentence}>
        <Story />
      </SentenceEditProvider>
    ),
  ],
  play: async ({ canvas, step }) => {
    await step('수정 모드에서는 수정 버튼이 표시되어야 한다', () => {
      const { cancelButton, editButton } = getButtons(canvas);

      expect(cancelButton()).toBeEnabled();
      expect(editButton()).toBeEnabled();
      expect(editButton()).toHaveTextContent('수정');
    });
  },
};

// 로딩 상태 - 모든 버튼이 비활성화되어야 함
export const LoadingState: Story = {
  decorators: [withMockedSentenceEditContext(pending)],
  play: async ({ canvas, step }) => {
    await step('로딩 중일 때 모든 버튼이 비활성화되어야 한다', () => {
      const { cancelButton, loadingButton } = getButtons(canvas);

      expect(cancelButton()).toBeDisabled();
      expect(loadingButton()).toBeDisabled();
      expect(loadingButton()).toHaveTextContent('처리 중...');
    });
  },
};

// 취소 버튼 클릭 - 뒤로가기 동작
export const CancelButtonInteraction: Story = {
  decorators: [withMockedSentenceEditContext(valid)],
  play: async ({ canvas, step, userEvent }) => {
    await step('취소 버튼을 클릭하면 뒤로가기가 실행되어야 한다', async () => {
      const { cancelButton } = getButtons(canvas);

      await userEvent.click(cancelButton());
      expect(getRouter().back).toHaveBeenCalledOnce();
    });
  },
};

// 등록 버튼 클릭 - 확인 다이얼로그 표시
export const SubmitButtonInteraction: Story = {
  decorators: [withMockedSentenceEditContext(valid)],
  play: async ({ canvas, step, userEvent }) => {
    await step(
      '등록 버튼을 클릭하면 확인 다이얼로그가 표시되어야 한다',
      async () => {
        const { submitButton } = getButtons(canvas);

        await userEvent.click(submitButton());

        // 다이얼로그가 표시되는지 확인
        const dialog = await screen.findByRole('dialog');
        expect(dialog).toBeInTheDocument();

        // 다이얼로그 내용 확인
        expect(
          screen.getByText('작성한 내용을 등록하시겠습니까?'),
        ).toBeInTheDocument();

        // 다이얼로그 버튼들 확인
        const dialogButtons = within(dialog);
        expect(
          dialogButtons.getByRole('button', { name: '취소' }),
        ).toBeInTheDocument();
        expect(
          dialogButtons.getByRole('button', { name: '등록' }),
        ).toBeInTheDocument();
      },
    );

    await step(
      '다이얼로그 취소 버튼을 클릭하면 다이얼로그가 닫혀야 한다',
      async () => {
        const dialog = screen.getByRole('dialog');
        const dialogButtons = within(dialog);

        await userEvent.click(
          dialogButtons.getByRole('button', { name: '취소' }),
        );

        await waitFor(() => {
          expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
        });
      },
    );
  },
};

// 수정 버튼 클릭 - 수정 확인 다이얼로그 표시
export const EditButtonInteraction: Story = {
  decorators: [withMockedSentenceEditContext(edit)],
  play: async ({ canvas, step, userEvent }) => {
    await step(
      '수정 버튼을 클릭하면 수정 확인 다이얼로그가 표시되어야 한다',
      async () => {
        const { editButton } = getButtons(canvas);

        await userEvent.click(editButton());

        // 다이얼로그가 표시되는지 확인
        const dialog = await screen.findByRole('dialog');
        expect(dialog).toBeInTheDocument();

        // 다이얼로그 내용 확인 (수정 모드)
        expect(
          screen.getByText('내용을 수정하시겠습니까?'),
        ).toBeInTheDocument();

        // 다이얼로그 버튼들 확인 (수정 모드)
        const dialogButtons = within(dialog);
        expect(
          dialogButtons.getByRole('button', { name: '취소' }),
        ).toBeInTheDocument();
        expect(
          dialogButtons.getByRole('button', { name: '수정' }),
        ).toBeInTheDocument();
      },
    );
  },
};

// 다이얼로그 확인 버튼 클릭 - 폼 제출
export const DialogConfirmInteraction: Story = {
  decorators: [
    withMockedSentenceEditContext({
      ...valid,
      submitForm: fn(),
    }),
  ],
  play: async ({ canvas, step, userEvent }) => {
    await step(
      '등록 다이얼로그에서 확인을 클릭하면 다이얼로그가 닫혀야 한다',
      async () => {
        const { submitButton } = getButtons(canvas);

        // 등록 버튼 클릭하여 다이얼로그 열기
        await userEvent.click(submitButton());

        const dialog = await screen.findByRole('dialog');
        const dialogButtons = within(dialog);

        // 다이얼로그에서 등록 버튼 클릭
        await userEvent.click(
          dialogButtons.getByRole('button', { name: '등록' }),
        );

        // 다이얼로그가 닫혔는지 확인
        await waitFor(() => {
          expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
        });
      },
    );
  },
};

// 키보드 접근성 테스트
export const KeyboardAccessibility: Story = {
  decorators: [withMockedSentenceEditContext(valid)],
  play: async ({ canvas, step, userEvent }) => {
    await step('키보드 탐색이 올바르게 작동해야 한다', async () => {
      const { cancelButton, submitButton } = getButtons(canvas);

      // Tab으로 버튼들 사이 이동
      await userEvent.tab();
      expect(cancelButton()).toHaveFocus();

      await userEvent.tab();
      expect(submitButton()).toHaveFocus();

      // Enter로 버튼 활성화
      await userEvent.keyboard('{Enter}');

      // 다이얼로그가 표시되는지 확인
      const dialog = await screen.findByRole('dialog');
      expect(dialog).toBeInTheDocument();
    });
  },
};

// 버튼 상태와 속성 테스트
export const ButtonStateAndAttributes: Story = {
  decorators: [
    (Story) => (
      <SentenceEditProvider>
        <Story />
      </SentenceEditProvider>
    ),
  ],
  play: async ({ canvas, step }) => {
    await step('버튼들이 올바른 속성과 초기 상태를 가져야 한다', () => {
      const { cancelButton, submitButton } = getButtons(canvas);

      // 초기 상태: 비활성화됨 (빈 폼이므로)
      expect(cancelButton()).toBeDisabled();
      expect(submitButton()).toBeDisabled();
      expect(submitButton()).toHaveTextContent('등록');

      // 버튼들이 올바른 타입을 가지는지 확인
      expect(cancelButton()).toHaveAttribute('type', 'button');
      expect(submitButton()).toHaveAttribute('type', 'submit');
    });
  },
};
