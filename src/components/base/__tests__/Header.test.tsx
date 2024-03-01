import { screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import { render } from '../../../test-utils/testRender';
import Header from '../Header';
import { useUserQuery } from '../../../lib/hooks';
import MockUser from '../../../test-utils/mocks/data/user.json';

jest.mock('../../../lib/hooks', () => ({
  useUserQuery: jest.fn(),
}));

const mockUseCurrentUser = (data: User | undefined) => {
  (useUserQuery as jest.Mock).mockImplementation(() => ({ data }));
};

const renderHeaderComponent = () => {
  render(<Header />, { wrapper: BrowserRouter });

  const GoogleButton = () =>
    screen.queryByLabelText(/google/, {
      selector: 'button',
    });
  const Avatar = () => screen.queryByRole('img', { name: 'user name' });

  return { GoogleButton, Avatar };
};

describe('Header Component', () => {
  beforeEach(() => {
    (useUserQuery as jest.Mock).mockImplementation(() => ({}));
  });

  it('로그인 전에는 구글 로그인 버튼을 보여준다.', () => {
    mockUseCurrentUser(undefined);
    const { GoogleButton } = renderHeaderComponent();
    expect(GoogleButton()).toBeInTheDocument();
  });

  it('로그인 후에는 버튼 대신에 프로필 이미지를 보여준다.', () => {
    mockUseCurrentUser(MockUser);
    const { GoogleButton, Avatar } = renderHeaderComponent();
    expect(GoogleButton()).not.toBeInTheDocument();
    expect(Avatar()).toBeInTheDocument();
  });
});