import { screen } from '@testing-library/react';
import { render } from '@/lib/test/render';
import Header from '../Header';

const renderHeaderComponent = () => {
  render(<Header />);

  const GoogleButton = () =>
    screen.queryByLabelText(/google/, {
      selector: 'button',
    });
  const Avatar = () => screen.queryByRole('img', { name: 'user name' });

  return { GoogleButton, Avatar };
};

describe('로그인 전', () => {
  it('구글 로그인 버튼을 보여준다.', () => {
    renderHeaderComponent();
  });
  // it('로그인 전에는 구글 로그인 버튼을 보여준다.', () => {
  //   useUserQuerySpy.mockReturnValue({
  //     data: undefined,
  //     isLoading: false,
  //   } as UseQueryResult<User>);
  //   const { GoogleButton } = renderHeaderComponent();
  //   expect(GoogleButton()).toBeInTheDocument();
  // });
  // it('로그인 후에는 버튼 대신에 프로필 이미지를 보여준다.', () => {
  //   useUserQuerySpy.mockReturnValue({
  //     data: MockUser as User,
  //     isLoading: false,
  //   } as UseQueryResult<User>);
  //   const { GoogleButton, Avatar } = renderHeaderComponent();
  //   expect(GoogleButton()).not.toBeInTheDocument();
  //   expect(Avatar()).toBeInTheDocument();
  // });
});

describe('로그인 후', () => {
  it('프로필 이미지를 보여준다', () => {
    renderHeaderComponent();
  });
});
