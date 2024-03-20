import { screen } from '@testing-library/react';
import { render } from '@/lib/test/render';
import { useUserStore } from '@/store/user';
import AuthGuard from '../AuthGuard';

beforeEach(() => {
  const state = useUserStore.getState();
  useUserStore.setState({ ...state, isLogin: false, user: null });
});

test('사용자가 로그인하지 않은 상태면 로그인 버튼을 보여준다.', () => {
  const { loginButton } = renderComponent();
  expect(loginButton()).toBeInTheDocument();
});

const renderComponent = () => {
  render(<AuthGuard />);
  const loginButton = () =>
    screen.queryByLabelText(/google/, {
      selector: 'button',
    });
  return { loginButton };
};
