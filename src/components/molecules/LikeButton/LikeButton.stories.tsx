import { MockUser } from '@/mocks/data';
import { useUserStore } from '@/store/user';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, screen } from 'storybook/test';
import LikeButton from '.';

const meta = {
  title: 'common/molecules/LikeButton',
  component: LikeButton,
} satisfies Meta<typeof LikeButton>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {
  decorators: [
    (Story) => {
      const state = useUserStore.getState();
      useUserStore.setState({ ...state, user: MockUser, isLogin: true });
      return <Story />;
    },
  ],
  args: {
    id: '1',
    isLiked: false,
  },
};

export const Liked: Story = {
  decorators: [
    (Story) => {
      const state = useUserStore.getState();
      useUserStore.setState({ ...state, user: MockUser, isLogin: true });
      return <Story />;
    },
  ],
  args: {
    id: '1',
    isLiked: true,
  },
};

export const NotLoggedIn: Story = {
  decorators: [
    (Story) => {
      const state = useUserStore.getState();
      useUserStore.setState({ ...state, user: null, isLogin: false });
      return <Story />;
    },
  ],
  args: {
    id: '1',
    isLiked: false,
  },
  play: async ({ canvas, step, userEvent }) => {
    await step(
      '비로그인 상태에서 버튼을 클릭하면 로그인하라는 안내 메시지가 표시된다.',
      async () => {
        const button = canvas.getByRole('button', { name: '좋아요' });
        await userEvent.click(button);
        expect(
          screen.getByText('로그인 후에 이용해주세요.'),
        ).toBeInTheDocument();
      },
    );
  },
};
