import type { Meta, StoryObj } from '@storybook/react';
import LoginButton from '@components/common/login-button';

const meta = {
  title: 'common/LoginButton',
  component: LoginButton,
} satisfies Meta<typeof LoginButton>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * 구글 로그인 버튼입니다.
 */
export const Default: Story = {
  args: {},
};
