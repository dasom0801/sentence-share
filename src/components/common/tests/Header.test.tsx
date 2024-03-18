import { screen } from '@testing-library/react';
import { render } from '@/lib/test/render';
import Header from '../Header';
import { Route, Routes } from 'react-router-dom';
import { server } from '@/setupTests';
import { HttpResponse, http } from 'msw';
import { MockUser } from '@/mocks/data';
import { apiRoutes } from '@/constants';

const navigateFn = vi.fn();
vi.mock('react-router-dom', async () => {
  const origin = await vi.importActual('react-router-dom');
  return {
    ...origin,
    useNavigate: () => navigateFn,
  };
});

it('로고를 클릭하면 / 경로로 페이지가 이동한다.', async () => {
  // 가상의 라우트를 선언하여 Main Page로 이동한 것을 확인한다.
  const { user } = render(
    <Routes>
      <Route
        path='/'
        element={
          <div>
            <Header />
            <h1>Main Page</h1>
          </div>
        }
      />
      <Route
        path='/sentence/:id'
        element={
          <div>
            <Header />
            <h1>Sentence Page</h1>
          </div>
        }
      />
    </Routes>,
    { routerProps: { initialEntries: ['/sentence/1'] } }
  );

  await user.click(screen.getByRole('link', { name: 'SentenceShare' }));
  const mainPageTitle = screen.getByRole('heading', { name: 'Main Page' });
  expect(mainPageTitle).toBeInTheDocument();
});

describe('로그인하지 않은 경우', () => {
  it('구글 로그인 버튼을 보여준다.', () => {
    render(<Header />);
    const GoogleButton = screen.queryByLabelText(/google/, {
      selector: 'button',
    });
    expect(GoogleButton).toBeInTheDocument();
  });
});

// TODO: 사용자 API 결과를 store로 이동한 다음에 재작성
describe('로그인한 경우', () => {
  // API 응답에 사용자 정보를 추가하여 로그인 상태를 만들어 준다.
  beforeEach(async () => {
    server.use(
      http.get(`*${apiRoutes.user}`, () => {
        return HttpResponse.json(MockUser, { status: 200 });
      })
    );
  });

  it('작성하기 버튼을 보여준다.', async () => {
    render(<Header />);
    // await user.click(EditButton);
    // expect(navigateFn).toHaveBeenNthCalledWith(1, pageRoutes.)
  });

  // it('작성하기 버튼을 클릭하면 /edit/sentence 경로로 navigate 함수가 호출된다.', () => {});

  // it('프로필 이미지를 보여준다', () => {});

  // it('프로필 이미지를 클릭하면 메뉴를 보여준다.');

  // it('각 메뉴를 누르면 해당 페이지로 이동한다.');
});
