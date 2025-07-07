import { MockUser } from '@/mocks/data';
import { useUserStore } from '@/store/user';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { getRouter } from '@storybook/nextjs-vite/navigation.mock';
import { expect, screen } from 'storybook/test';
import Header from '.';
import { navigateMenus } from './HeaderMenu';

const meta = {
  title: 'layout/Header',
  component: Header,
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    nextjs: {
      navigation: {
        router: {
          basePath: '/test',
        },
      },
    },
  },
  play: ({ canvas, step, userEvent }) => {
    step('Logo를 클릭하면 메인 페이지로 이동한다.', async () => {
      const logo = canvas.getByRole('link', { name: 'SentenceShare' });
      await userEvent.click(logo);
      expect(getRouter().push).toHaveBeenCalledWith('/', {
        scroll: true,
      });
    });
  },
};

export const LoggedOut: Story = {
  render: () => {
    const state = useUserStore.getState();
    useUserStore.setState({ ...state, isLogin: false, user: null });
    return <Header />;
  },
  play: ({ canvas, step }) => {
    step('로그아웃 상태에서는 로그인 버튼이 표시된다.', () => {
      expect(
        canvas.getByRole('button', { name: 'continue with google' }),
      ).toBeInTheDocument();
    });
  },
};

export const LoggedIn: Story = {
  render: () => {
    const state = useUserStore.getState();
    useUserStore.setState({ ...state, isLogin: true, user: MockUser });
    return <Header />;
  },
  play: async ({ canvas, step, userEvent }) => {
    const editButton = canvas.getByRole('button', { name: '작성하기' });
    const userProfileImage = canvas.getByRole('img', { name: MockUser.name });
    await step(
      '로그인 상태에서는 작성하기 버튼과 사용자 프로필 이미지가 보인다.',
      () => {
        expect(editButton).toBeInTheDocument();
        expect(userProfileImage.getAttribute('src')).toContain(
          MockUser.profileUrl,
        );
      },
    );
    await step('작성하기 버튼을 클릭하면 작성 페이지로 이동한다.', async () => {
      await userEvent.click(editButton);
      expect(getRouter().push).toHaveBeenCalledWith('/edit/sentence');
    });
    await step('사용자 프로필 이미지를 클릭하면 메뉴가 표시된다.', async () => {
      await userEvent.click(userProfileImage);
      expect(screen.getByRole('menu')).toBeInTheDocument();
    });
    await step('각 메뉴를 클릭하면 해당 페이지로 이동한다.', async () => {
      await userEvent.click(userProfileImage);
      navigateMenus.forEach(async (menu) => {
        const menuitem = screen.getByRole('menuitem', { name: menu.label });
        await userEvent.click(menuitem);
        expect(getRouter().push).toBeCalledWith(menu.path);
      });
    });
  },
};
