import { screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';

import { render } from '../../test-utils/testRender';
import Header from '.';
import { useUserQuery } from '../../hooks';
import MockUser from '../../test-utils/mocks/data/user.json';

jest.mock('../../hooks', () => ({
  useUserQuery: jest.fn(),
}));

const mockUseCurrentUser = (data: User | undefined) => {
  (useUserQuery as jest.Mock).mockImplementation(() => ({ data }));
};

describe('Header 컴포넌트', () => {
  beforeEach(() => {
    (useUserQuery as jest.Mock).mockImplementation(() => ({}));
  });

  it('로그인 전에는 구글 로그인 버튼을 보여준다.', () => {
    mockUseCurrentUser(undefined);

    render(<Header />, { wrapper: BrowserRouter });
    const googleButton = screen.getByLabelText(/google/, {
      selector: 'button',
    });
    expect(googleButton).toBeInTheDocument();
  });

  it('로그인 후에는 버튼 대신에 프로필 이미지를 보여준다.', () => {
    mockUseCurrentUser(MockUser);
    render(<Header />, { wrapper: BrowserRouter });
    const googleButton = screen.queryByLabelText(/google/, {
      selector: 'button',
    });
    expect(googleButton).not.toBeInTheDocument();
    const avatar = screen.queryByRole('img', { name: 'user name' });
    expect(avatar).toBeInTheDocument();
  });

  it('프로필 이미지를 클릭하면 프로필 페이지로 이동한다.', async () => {
    mockUseCurrentUser(MockUser);

    render(<Header />, { wrapper: BrowserRouter });
    const user = userEvent.setup();
    const profileLink = screen.getByLabelText(/user name/, { selector: 'a' });
    await user.click(profileLink);
    expect(window.location.pathname).toBe('/profile');
  });
});
