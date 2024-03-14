import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ErrorResult from '../ErrorResult';

it('"다시 시도" 버튼을 클릭하면 props의 resetErrorBoundary함수가 호출된다.', async () => {
  const user = userEvent.setup();
  const spyFn = vi.fn();
  const error = new Error('에러');
  render(<ErrorResult resetErrorBoundary={spyFn} error={error} />);
  const button = screen.getByRole('button', { name: '다시 시도' });
  await user.click(button);
  expect(spyFn).toHaveBeenCalled();
});
