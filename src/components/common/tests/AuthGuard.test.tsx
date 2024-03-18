import { screen } from '@testing-library/react';
import AuthGuard from '../AuthGuard';
import * as hooks from '@/lib/hooks';
import { UseQueryResult } from '@tanstack/react-query';
import { render } from '@/lib/test/render';

const renderAuthGuard = () => {
  render(<AuthGuard />);
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
});
