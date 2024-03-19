import { Route, Routes } from 'react-router-dom';
import { screen, within } from '@testing-library/react';
import { render } from '@/lib/test/render';
import { MockSentences } from '@/mocks/data';
import SentenceLikeCardList from '../SentenceLikeCardList';

const toggleLikeFn = vi.fn();
const PAGE_LIMIT = 5;
const list = MockSentences.slice(0, PAGE_LIMIT) as Sentence[];

it('문장 목록이 표시된다.', () => {
  const { listItems } = renderComponent();
  expect(listItems()).toHaveLength(PAGE_LIMIT);
  listItems().forEach((el, index) => {
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

it('좋아요 버튼을 클릭하면 sentence id와 함께 onToggleLike 함수가 호출된다.', async () => {
  const { clickLike } = renderComponent();
  await clickLike();
  expect(toggleLikeFn).toHaveBeenNthCalledWith(1, MockSentences[0]._id);
});

it('리스트 아이템의 문장 내용을 클릭하면 문장 상세 페이지로 이동한다.', async () => {
  const { clickSentenceLink } = renderComponent();
  await clickSentenceLink();
  const sentenceDetailTitle = screen.getByRole('heading', {
    name: 'Sentence Detail',
  });
  expect(sentenceDetailTitle).toBeInTheDocument();
});

it('리스트 아이템의 책 제목을 클릭하면 책 상세 페이지로 이동한다.', async () => {
  const { clickBookLink } = renderComponent();
  await clickBookLink();
  const bookDetailTitle = screen.getByRole('heading', { name: 'Book Detail' });
  expect(bookDetailTitle).toBeInTheDocument();
});

const wrapWithRoutes = (
  <Routes>
    <Route
      path='/'
      element={<SentenceLikeCardList list={list} onToggleLike={toggleLikeFn} />}
    />
    <Route
      path={`/sentence/${list[0]._id}`}
      element={<h1>Sentence Detail</h1>}
    />
    <Route path={`/book/${list[0].book?._id}`} element={<h1>Book Detail</h1>} />
  </Routes>
);

const renderComponent = (initialEntries: string[] = ['/']) => {
  const { user } = render(wrapWithRoutes, { routerProps: { initialEntries } });
  const listEl = () => screen.getByRole('list');
  const listItems = () => within(listEl()).getAllByRole('listitem');
  const firstListItem = () => listItems()[0];
  const sentenceLink = () =>
    within(firstListItem()).getByRole('link', { name: list[0].content });
  const bookLink = () =>
    within(firstListItem()).getByText(list[0].book?.title || '');
  const likeButton = () =>
    within(firstListItem()).getByRole('button', { name: '좋아요' });

  const clickLike = async () => await user.click(likeButton());
  const clickSentenceLink = async () => await user.click(sentenceLink());
  const clickBookLink = async () => await user.click(bookLink());

  return { listItems, clickLike, clickSentenceLink, clickBookLink };
};
