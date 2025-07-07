import { MockUser } from '@/mocks/data';
import { useUserStore } from '@/store/user';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect } from 'storybook/test';
import SettingUserInfo from '.';

const meta = {
  title: 'page/setting/SettingUserInfo',
  component: SettingUserInfo,
} satisfies Meta<typeof SettingUserInfo>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {
  render: () => {
    const state = useUserStore.getState();
    useUserStore.setState({ ...state, user: MockUser });
    return <SettingUserInfo />;
  },
  play: async ({ canvas, step, userEvent }) => {
    const input = canvas.getByRole('textbox');
    await step('인풋에 사용자 이름이 입력되어 있다.', () => {
      const state = useUserStore.getState();
      expect(input).toHaveValue(state.user?.name);
    });
    await step(
      '인풋에 입력된 값이 없으면 경고가 표시되고 버튼은 disabled 상태가된다.',
      async () => {
        await userEvent.clear(input);
        expect(canvas.getByText('값을 입력해주세요.')).toBeInTheDocument();
        expect(canvas.getByRole('button', { name: '저장' })).toBeDisabled();
      },
    );
  },
};
