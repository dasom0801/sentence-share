import { screen, within } from '@testing-library/react';
import { Route, Routes } from 'react-router-dom';
import { HttpResponse, http } from 'msw';

import { server } from '@/setupTests';
import { MockUser } from '@/mocks/data';
import { apiRoutes } from '@/constants';
import { render } from '@/lib/test/render';
import { useUserStore } from '@/store/user';
import Header from '../Header';
import { navigateMenus } from '../HeaderMenu';

const navigateFn = vi.fn();

vi.mock('react-router-dom', async () => {
  const original = await vi.importActual('react-router-dom');
  return {
    ...original,
    useNavigate: () => navigateFn,
  };
});

it('로고를 클릭하면 / 경로로 페이지가 이동한다.', async () => {
  const { clickLogo } = renderComponent(['/edit/sentence']);
  await clickLogo();
  const mainPageTitle = screen.getByRole('heading', { name: 'Main Page' });
  expect(mainPageTitle).toBeInTheDocument();
});

describe('로그인하지 않은 경우', () => {
  it('구글 로그인 버튼을 보여준다.', () => {
    const { loginButton } = renderComponent();
    expect(loginButton()).toBeInTheDocument();
  });
});

describe('로그인한 경우', () => {
  beforeEach(async () => {
    server.use(
      http.get(`*${apiRoutes.user}`, () => {
        return HttpResponse.json(MockUser, { status: 200 });
      })
    );
    const state = useUserStore.getState();
    useUserStore.setState({ ...state, isLogin: true, user: MockUser });
  });

  it('작성하기 버튼을 보여준다.', async () => {
    const { editButton } = renderComponent();
    expect(editButton()).toBeInTheDocument();
  });

  it('작성하기 버튼을 클릭하면 /edit/sentence 경로로 이동한다.', async () => {
    const { clickEditButton } = renderComponent();
    await clickEditButton();
    const pageTitle = screen.getByRole('heading', { name: 'Edit Page' });
    expect(pageTitle).toBeInTheDocument();
  });

  it('프로필 이미지를 보여준다', () => {
    const { profileImage } = renderComponent();
    expect(profileImage()).toHaveAttribute('src', MockUser.profileUrl);
  });

  it('프로필 이미지를 클릭하면 메뉴를 보여준다.', async () => {
    const { clickProfileToOpenMenu, menu } = renderComponent();
    await clickProfileToOpenMenu();
    expect(menu()).toBeInTheDocument();
  });

  describe('메뉴 목록에서', () => {
    navigateMenus.forEach((navigateMenu, index) => {
      it(`${navigateMenu.label}을 클릭하면 ${navigateMenu.path} 경로로 navigate 함수가 호출된다.`, async () => {
        const { user, menu, clickProfileToOpenMenu } = renderComponent();
        await clickProfileToOpenMenu();
        const menuItem = within(menu()).getByText(navigateMenu.label);
        await user.click(menuItem);
        expect(navigateFn).toHaveBeenNthCalledWith(1, navigateMenu.path);
      });
    });

    it('로그아웃을 클릭하면 프로필 이미지와 작성하기 버튼이 사라지고, 로그인 버튼을 보여준다.', async () => {
      const { user, menu, loginButton, clickProfileToOpenMenu } =
        renderComponent();
      await clickProfileToOpenMenu();
      const logout = within(menu()).getByText('로그아웃');
      await user.click(logout);
      const profileImage = screen.queryByRole('img', { name: MockUser.name });
      const editButton = screen.queryByRole('link', { name: '작성하기' });
      expect(profileImage).not.toBeInTheDocument();
      expect(editButton).not.toBeInTheDocument();
      expect(loginButton()).toBeInTheDocument();
    });
  });
});

// 가상의 라우트를 선언하여 Link로 페이지 이동한 것을 확인한다.
const wrapWithRoutes = (
  <Routes>
    <Route
      path='/'
      element={
        <div>
          <Header />
          <h1>Main Page</h1>
        </div>
      }
    />
    <Route
      path='/my/sentence'
      element={
        <div>
          <Header />
          <h1>User Sentence Page</h1>
        </div>
      }
    />
    <Route
      path='/my/like'
      element={
        <div>
          <Header />
          <h1>User Like Page</h1>
        </div>
      }
    />
    <Route
      path='/my/setting'
      element={
        <div>
          <Header />
          <h1>Setting Page</h1>
        </div>
      }
    />
    <Route
      path='/edit/sentence'
      element={
        <div>
          <Header />
          <h1>Edit Page</h1>
        </div>
      }
    />
  </Routes>
);

const renderComponent = (initialEntries: string[] = ['/']) => {
  const { user } = render(wrapWithRoutes, {
    routerProps: { initialEntries },
  });
  const logo = () => screen.getByRole('link', { name: 'SentenceShare' });
  const editButton = () => screen.getByRole('link', { name: '작성하기' });
  const profileImage = () => screen.getByRole('img', { name: MockUser.name });
  const menu = () => screen.getByRole('menu');
  const loginButton = () =>
    screen.getByLabelText(/google/, {
      selector: 'button',
    });
  const clickLogo = async () => await user.click(logo());
  const clickEditButton = async () => await user.click(editButton());
  const clickProfileToOpenMenu = async () => await user.click(profileImage());

  return {
    user,
    editButton,
    profileImage,
    menu,
    loginButton,
    clickLogo,
    clickEditButton,
    clickProfileToOpenMenu,
  };
};
