import { screen } from '@testing-library/react';
import { HttpResponse, http } from 'msw';
import { MockBook, MockSentence } from '@/mocks/data';
import { render } from '@/lib/test/render';
import { server } from '@/setupTests';
import SentenceRelatedList, {
  RELATED_LIST_LIMIT,
} from '../sentence-related-list';

describe('책에 등록된 문장이 없다면', () => {
  // beforeEach(() => {
  //   server.use(
  //     http.get('*/api/book/1/sentences', () => {
  //       return HttpResponse.json({ list: [], total: 0 }, { status: 200 });
  //     }),
  //   );
  // });
  // it('책 제목과 목록을 보여주지 않는다.', async () => {
  //   renderComponent();
  //   const title = screen.queryByRole('heading');
  //   const list = screen.queryByRole('list');
  //   expect(title).not.toBeInTheDocument();
  //   expect(list).not.toBeInTheDocument();
  // });
});

describe('책에 등록된 문장이 있다면', () => {
  // it('책 제목을 보여준다.', async () => {
  //   const { title } = renderComponent();
  //   expect(await title()).toHaveTextContent(MockBook.title);
  // });
  //
  // it('문장 목록을 보여준다.', async () => {
  //   const { listItems } = renderComponent();
  //   const items = await listItems();
  //   expect(items).toHaveLength(RELATED_LIST_LIMIT);
  // });
});

const renderComponent = () => {
  // const { user } = render(<SentenceRelatedList sentenceId={MockSentence._id} book={MockBook} />);
  // const title = async () => await screen.findByRole('heading');
  // const listItems = async () => await screen.findAllByRole('listitem');
  // return { user, title, listItems };
  return {};
};
