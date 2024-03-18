import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NotFound from '../NotFound';

const navigateFn = vi.fn();
vi.mock('react-router-dom', async () => {
  const origin = await vi.importActual('react-router-dom');
  return {
    ...origin,
    useNavigate: () => navigateFn,
  };
});

it('뒤로 가기 버튼을 누르면 navigate 함수가 -1값으로 호출된다.', async () => {
  const user = userEvent.setup();
  render(<NotFound />);
  const button = screen.getByRole('button', { name: '뒤로 가기' });
  await user.click(button);
  expect(navigateFn).toHaveBeenNthCalledWith(1, -1);
});
