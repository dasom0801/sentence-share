import { screen } from '@testing-library/react';
import { render } from '@/lib/test/render';
import { MockBook } from '@/mocks/data';
import BookListItem from '../BookListItem';

it('클릭하면 props의 onClick 함수가 호출된다.', async () => {
  const spy = vi.fn();
  const { user } = render(<BookListItem book={MockBook} onClick={spy} />);
  const button = screen.getByRole('button');
  await user.click(button);
  expect(spy).toHaveBeenCalled();
});
