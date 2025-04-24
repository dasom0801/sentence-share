import type { Meta, StoryObj } from '@storybook/react';
import LoginButton from '.';

const meta = {
  title: 'common/molecules/LoginButton',
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
