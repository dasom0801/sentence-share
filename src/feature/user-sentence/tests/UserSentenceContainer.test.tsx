import { Route, Routes } from 'react-router-dom';
import { screen } from '@testing-library/react';
import { HttpResponse, http } from 'msw';

import { server } from '@/setupTests';
import { apiRoutes } from '@/constants';
import { render } from '@/lib/test/render';
import UserSentenceContainer from '../UserSentenceContainer';

const navigateFn = vi.fn();
vi.mock('react-router-dom', async () => {
  const origin = await vi.importActual('react-router-dom');
  return {
    ...origin,
    useNavigate: () => navigateFn,
  };
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
    const { user } = renderComponent();
    const button = await screen.findByRole('link', { name: '작성하기' });
    await user.click(button);
    const editSentenceTitle = screen.getByRole('heading', {
      name: 'Edit Sentence',
    });
    expect(editSentenceTitle).toBeInTheDocument();
  });
});

const wrapWithRoutes = (
  <Routes>
    <Route path='/my/sentence' element={<UserSentenceContainer />} />
    <Route path='/edit/sentence' element={<h1>Edit Sentence</h1>} />
  </Routes>
);

const renderComponent = (initialEntries: string[] = ['/my/sentence']) => {
  const { user } = render(wrapWithRoutes, {
    routerProps: { initialEntries },
  });
  return { user };
};
