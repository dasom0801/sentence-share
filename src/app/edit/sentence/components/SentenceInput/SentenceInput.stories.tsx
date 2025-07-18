import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { expect, waitFor } from 'storybook/test';
import SentenceInput from './';

const meta = {
  title: 'page/edit/sentence/SentenceInput',
  component: SentenceInput,
  args: {
    content: '',
    handleContent: () => {},
  },
} satisfies Meta<typeof SentenceInput>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {
  render: () => {
    const [content, setContent] = useState('Content');
    return (
      <SentenceInput
        content={content}
        handleContent={(content) => setContent(content)}
      />
    );
  },
  play: async ({ canvas, step, userEvent }) => {
    const textField = canvas.getByRole('textbox');
    await step('content 값과 함꼐 렌더링된다.', () => {
      expect(textField).toHaveValue('Content');
    });

    await step(
      '값을 입력하지 않고 Input에서 벗어나면 에러 메시지가 표시된다.',
      async () => {
        await userEvent.clear(textField);
        await userEvent.tab();
        await waitFor(() => {
          expect(
            canvas.queryByText('다섯 글자 이상 입력해 주세요.'),
          ).toBeInTheDocument();
        });
      },
    );

    await step(
      '다섯 글자 이상을 입력하지 않고 Input에서 벗어나면 에러 메시지가 표시된다.',
      async () => {
        await userEvent.type(textField, '하나둘셋');
        await userEvent.tab();
        await waitFor(() => {
          expect(
            canvas.queryByText('다섯 글자 이상 입력해 주세요.'),
          ).toBeInTheDocument();
        });
      },
    );
  },
};
