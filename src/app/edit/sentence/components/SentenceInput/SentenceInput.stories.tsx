import type { Meta, StoryObj } from '@storybook/react';
import { expect, waitFor } from 'storybook/test';
import { SentenceEditProvider } from '../../contexts';
import SentenceInput from './';

const meta = {
  title: 'page/edit/sentence/SentenceInput',
  component: SentenceInput,
  decorators: [
    (Story) => (
      <SentenceEditProvider>
        <Story />
      </SentenceEditProvider>
    ),
  ],
} satisfies Meta<typeof SentenceInput>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {
  play: async ({ canvas, step, userEvent }) => {
    const textField = canvas.getByRole('textbox');
    await step('기본적으로 빈 값으로 렌더링된다.', () => {
      expect(textField).toHaveValue('');
    });

    await step(
      '값을 입력하지 않고 Input에서 벗어나면 에러 메시지가 표시된다.',
      async () => {
        await userEvent.click(textField);
        await userEvent.tab();
        await waitFor(() => {
          expect(
            canvas.queryByText('다섯 글자 이상 입력해주세요.'),
          ).toBeInTheDocument();
        });
      },
    );

    await step(
      '다섯 글자 이상을 입력하지 않고 Input에서 벗어나면 에러 메시지가 표시된다.',
      async () => {
        await userEvent.clear(textField);
        await userEvent.type(textField, '하나둘셋');
        await userEvent.tab();
        await waitFor(() => {
          expect(
            canvas.queryByText('다섯 글자 이상 입력해주세요.'),
          ).toBeInTheDocument();
        });
      },
    );
  },
};
