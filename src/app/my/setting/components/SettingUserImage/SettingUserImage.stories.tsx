import { DEFAULT_PROFILE } from '@/constants';
import { MockUser } from '@/mocks/data';
import { useUserStore } from '@/store/user';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect } from 'storybook/test';
import SettingUserImage from '.';
const meta = {
  title: 'page/my/setting/SettingUserImage',
  component: SettingUserImage,
} satisfies Meta<typeof SettingUserImage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const UserProfileImage: Story = {
  render: () => {
    const state = useUserStore.getState();
    useUserStore.setState({ ...state, user: MockUser });
    return <SettingUserImage />;
  },
  play: ({ canvas, step }) => {
    step('사용자 프로필 이미지를 표시한다.', () => {
      const state = useUserStore.getState();
      expect(
        canvas.getByRole('img', { name: state.user?.name }).getAttribute('src'),
      ).toContain(state.user?.profileUrl);
    });
  },
};
export const DefaultProfileImage: Story = {
  render: () => {
    const state = useUserStore.getState();
    useUserStore.setState({ ...state, user: { ...MockUser, profileUrl: '' } });
    return <SettingUserImage />;
  },
  play: ({ canvas, step }) => {
    step('사용자 프로필 이미지가 없으면 기본 이미지를 표시한다.', () => {
      const state = useUserStore.getState();

      expect(
        canvas.getByRole('img', { name: state.user?.name }).getAttribute('src'),
      ).toContain(DEFAULT_PROFILE);
    });
  },
};
