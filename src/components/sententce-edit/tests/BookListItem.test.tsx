import { render, screen } from '@testing-library/react';
import BookListItem from '../BookListItem';
import { MockBook } from '@/test-utils/index.mock';
import userEvent from '@testing-library/user-event';

it('클릭하면 props의 onClick 함수가 호출된다.', async () => {
  const spy = vi.fn();
  const user = userEvent.setup();
  render(<BookListItem book={MockBook} onClick={spy} />);
  const listItem = screen.getByRole('listitem');
  await user.click(listItem);
  expect(spy).toHaveBeenCalled();
});
