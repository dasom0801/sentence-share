import { render } from '@/lib/test/render';
import { MockSentences } from '@/mocks/data';
import UserSentenceContainer from '../UserSentenceContainer';
import { screen, within } from '@testing-library/react';
import { server } from '@/setupTests';
import { HttpResponse, http } from 'msw';
import { apiRoutes } from '@/constants';
import { Route, Routes } from 'react-router-dom';

const navigateFn = vi.fn();
vi.mock('react-router-dom', async () => {
  const origin = await vi.importActual('react-router-dom');
  return {
    ...origin,
    useNavigate: () => navigateFn,
  };
});

describe('작성한 문장이 있는 경우', () => {
  it('로딩이 완료되면 문장 목록이 표시된다.', async () => {
    render(<UserSentenceContainer />);
    const listItems = await screen.findAllByRole('listitem');

    expect(listItems).toHaveLength(MockSentences.length);

    listItems.forEach((el, index) => {
      const sentenceCard = within(el);
      const sentence = MockSentences[index];
      expect(sentenceCard.getByText(sentence.content)).toBeInTheDocument();
      expect(sentenceCard.getByText(sentence.book.title)).toBeInTheDocument();
      expect(
        sentenceCard.getByText(sentence.book.author.join(','))
      ).toBeInTheDocument();
      expect(
        sentenceCard.getByRole('img', { name: sentence.book.title })
      ).toBeInTheDocument();
    });
  });

  it('수정 버튼을 클릭하면 /edit/sentence/:id 경로로 이동한다.', () => {});

  describe('삭제 버튼을 클릭한 경우', () => {
    beforeEach(() => {
      // 버튼을 찾아서 클릭
    });

    it('문장을 삭제하시겠습니까? 라는 내용이 있는 모달이 보여진다.', () => {
      // role dialog
    });

    it('취소 버튼을 클릭하면 모달이 사라진다.', () => {});

    it('확인 버튼을 클릭하면 모달이 화면에서 사라지고, 해당 문장이 목록에서 사라진다.', () => {});
  });
});

describe('작성한 문장이 없는 경우', () => {
  beforeEach(() => {
    server.use(
      http.get(`*${apiRoutes.sentences}`, () => {
        return HttpResponse.json(
          {
            list: [],
            total: 0,
            page: 1,
            limit: 10,
            pageTotal: 1,
          },
          { status: 200 }
        );
      })
    );
  });

  it('문장이 없다는 내용의 안내를 보여준다.', async () => {
    render(<UserSentenceContainer />);
    const title = await screen.findByText('문장이 없습니다.');
    const description = await screen.findByText(
      '내가 좋아하는 책 속의 문장을 모두와 공유해보세요.'
    );
    expect(title).toBeInTheDocument();
    expect(description).toBeInTheDocument();
  });

  it('작성하기 버튼을 누르면 /edit/sentence 경로로 이동한다.', async () => {
    const { user } = render(
      <Routes>
        <Route path='/my/sentence' element={<UserSentenceContainer />} />
        <Route path='/edit/sentence' element={<h1>Edit Sentence</h1>} />
      </Routes>,
      {
        routerProps: { initialEntries: ['/my/sentence'] },
      }
    );
    const button = await screen.findByRole('link', { name: '작성하기' });
    await user.click(button);
    const editSentenceTitle = screen.getByRole('heading', {
      name: 'Edit Sentence',
    });
    expect(editSentenceTitle).toBeInTheDocument();
  });
});
