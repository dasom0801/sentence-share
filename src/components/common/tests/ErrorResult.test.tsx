import { screen } from '@testing-library/react';
import { render } from '@/lib/test/render';
import ErrorResult from '../ErrorResult';

it('"다시 시도" 버튼을 클릭하면 props의 resetErrorBoundary함수가 호출된다.', async () => {
  const spyFn = vi.fn();
  const error = new Error('에러');
  const { user } = render(
    <ErrorResult resetErrorBoundary={spyFn} error={error} />
  );
  const button = screen.getByRole('button', { name: '다시 시도' });
  await user.click(button);
  expect(spyFn).toHaveBeenCalled();
});
