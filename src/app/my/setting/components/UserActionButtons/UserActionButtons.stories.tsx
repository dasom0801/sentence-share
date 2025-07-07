import type { Meta, StoryObj } from '@storybook/react';
import { expect, screen } from 'storybook/test';
import UserActionButtons from './';

const meta = {
  title: 'page/setting/UserActionButtons',
  component: UserActionButtons,
} satisfies Meta<typeof UserActionButtons>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {
  play: async ({ canvas, step, userEvent }) => {
    await step('회원탈퇴 버튼을 클릭하면 Alert이 표시된다.', async () => {
      const button = canvas.getByRole('button', { name: '회원탈퇴' });
      await userEvent.click(button);
      expect(screen.getByRole('dialog')).toBeInTheDocument();
      expect(screen.getByText('탈퇴하시겠습니까?')).toBeInTheDocument();
      await userEvent.click(screen.getByRole('button', { name: '취소' }));
    });
  },
};
