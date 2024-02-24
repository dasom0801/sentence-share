import { screen } from '@testing-library/react';
import AuthGuard from '../AuthGuard';
import { useUserQuery } from '../../../lib/hooks';
import { render } from '../../../test-utils/testRender';
import MockUser from '../../../test-utils/mocks/data/user.json';

jest.mock('../../../lib/hooks', () => ({
  useUserQuery: jest.fn(),
}));

const mockUseCurrentUser = (data: User | undefined) => {
  (useUserQuery as jest.Mock).mockImplementation(() => ({ data }));
};

const renderAuthGuard = () => {
  render(<AuthGuard />);
  const GoogleButton = () =>
    screen.queryByLabelText(/google/, {
      selector: 'button',
    });
  return { GoogleButton };
};

describe('components > common > AuthGuard', () => {
  test('사용자가 로그인하지 않은 상태면 로그인 버튼을 보여준다.', () => {
    mockUseCurrentUser(undefined);
    const { GoogleButton } = renderAuthGuard();
    expect(GoogleButton()).toBeInTheDocument();
  });

  test('사용자가 로그인한 상태면 로그인 버튼을 보여주지 않는다.', () => {
    mockUseCurrentUser(MockUser);
    const { GoogleButton } = renderAuthGuard();
    expect(GoogleButton()).not.toBeInTheDocument();
  });
});
