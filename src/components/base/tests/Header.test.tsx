import { screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import { renderWithReactQuery } from '../../../test-utils/testRender';
import Header from '../Header';
import * as hooks from '@/lib';
import MockUser from '../../../test-utils/mocks/data/user.json';
import type { UseQueryResult } from '@tanstack/react-query';

const renderHeaderComponent = () => {
  renderWithReactQuery(<Header />, { wrapper: BrowserRouter });

  const GoogleButton = () =>
    screen.queryByLabelText(/google/, {
      selector: 'button',
    });
  const Avatar = () => screen.queryByRole('img', { name: 'user name' });

  return { GoogleButton, Avatar };
};

describe('Header Component', () => {
  const useUserQuerySpy = vi.spyOn(hooks, 'useUserQuery');
  afterEach(() => {
    useUserQuerySpy.mockClear();
  });

  it('로그인 전에는 구글 로그인 버튼을 보여준다.', () => {
    useUserQuerySpy.mockReturnValue({
      data: undefined,
      isLoading: false,
    } as UseQueryResult<User>);
    const { GoogleButton } = renderHeaderComponent();
    expect(GoogleButton()).toBeInTheDocument();
  });

  it('로그인 후에는 버튼 대신에 프로필 이미지를 보여준다.', () => {
    useUserQuerySpy.mockReturnValue({
      data: MockUser as User,
      isLoading: false,
    } as UseQueryResult<User>);
    const { GoogleButton, Avatar } = renderHeaderComponent();
    expect(GoogleButton()).not.toBeInTheDocument();
    expect(Avatar()).toBeInTheDocument();
  });
});