import { screen } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import { MockSentence } from '@/mocks/data';
import { render } from '@/lib/test/render';
import SentenceDetailContainer from '../SentenceDetailContainer';

const useParamsFn = vi.fn();
vi.mock('react-router-dom', async () => {
  const original = await vi.importActual('react-router-dom');
  return {
    ...original,
    useParams: () => useParamsFn(),
  };
});

useParamsFn.mockImplementation(() => ({ id: MockSentence._id }));

it('책 정보를 보여준다.', async () => {
  const { bookCover, bookTitle, bookAuthor } = renderComponent();
  expect(await bookTitle()).toBeInTheDocument();
  expect(await bookCover()).toBeInTheDocument();
  expect(await bookCover()).toHaveAttribute('src', MockSentence.book.coverUrl);
  expect(await bookAuthor()).toBeInTheDocument();
});

it('문장을 보여준다.', async () => {
  const { sentence } = renderComponent();
  expect(await sentence()).toBeInTheDocument();
});

it('작성자 프로필 이미지와 이름을 보여준다.', async () => {
  const { authorImage, authorName } = renderComponent();
  expect(await authorImage()).toBeInTheDocument();
  expect(await authorImage()).toHaveAttribute(
    'src',
    MockSentence.author.profileUrl
  );
  expect(await authorName()).toBeInTheDocument();
});

const renderComponent = () => {
  render(
    <HelmetProvider>
      <SentenceDetailContainer />
    </HelmetProvider>
  );
  const bookCover = async () =>
    await screen.findByRole('img', { name: MockSentence.book.title });
  const bookTitle = async () =>
    await screen.findByRole('heading', { name: MockSentence.book.title });
  const bookAuthor = async () =>
    await screen.findByText(MockSentence.book.author.join(','));
  const sentence = async () => await screen.findByText(MockSentence.content);
  const authorImage = async () =>
    await screen.findByRole('img', { name: MockSentence.author.name });
  const authorName = async () =>
    await screen.findByText(MockSentence.author.name);
  return {
    bookCover,
    bookTitle,
    bookAuthor,
    sentence,
    authorImage,
    authorName,
  };
};
