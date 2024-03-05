import { screen } from '@testing-library/react';
import AuthGuard from '../AuthGuard';
import * as hooks from '../../../lib/hooks';
import { renderWithReactQuery } from '../../../test-utils/testRender';
import MockUser from '../../../test-utils/mocks/data/user.json';
import { UseQueryResult } from '@tanstack/react-query';

const renderAuthGuard = () => {
  renderWithReactQuery(<AuthGuard />);
  const GoogleButton = () =>
    screen.queryByLabelText(/google/, {
      selector: 'button',
    });
  return { GoogleButton };
};

describe('components > common > AuthGuard', () => {
  const useUserQuerySpy = vi.spyOn(hooks, 'useUserQuery');

  afterEach(() => {
    useUserQuerySpy.mockClear();
  });
  test('사용자가 로그인하지 않은 상태면 로그인 버튼을 보여준다.', () => {
    useUserQuerySpy.mockReturnValue({
      data: undefined,
    } as UseQueryResult<User>);
    const { GoogleButton } = renderAuthGuard();
    expect(GoogleButton()).toBeInTheDocument();
  });

  test('사용자가 로그인한 상태면 로그인 버튼을 보여주지 않는다.', () => {
    useUserQuerySpy.mockReturnValue({
      data: MockUser as User,
    } as UseQueryResult<User>);
    const { GoogleButton } = renderAuthGuard();
    expect(GoogleButton()).not.toBeInTheDocument();
  });
});
