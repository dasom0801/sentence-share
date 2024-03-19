import { Route, Routes } from 'react-router-dom';
import { screen, waitFor, within } from '@testing-library/react';
import { MockSentences } from '@/mocks/data';
import { render } from '@/lib/test/render';
import UserSentenceList from '../UserSentenceList';

const PAGE_LIMIT = 5;
const SentencePagiantionResult: PaginationResult<Sentence> = {
  list: MockSentences.slice(0, PAGE_LIMIT) as Sentence[],
  total: 10,
  page: 1,
  limit: PAGE_LIMIT,
  pageTotal: 2,
};

const handleDeleteFn = vi.fn();

it('문장 목록이 표시된다.', async () => {
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

it('수정 버튼을 클릭하면 /edit/sentence/:id 경로로 이동한다.', async () => {
  const { clickEditButton } = renderComponent();
  await clickEditButton();
  const editPageTitle = screen.getByRole('heading', { name: 'Edit Sentence' });
  expect(editPageTitle).toBeInTheDocument();
});

describe('삭제 버튼을 클릭한 경우', () => {
  it('문장을 삭제하시겠습니까? 라는 내용이 있는 모달이 보여진다.', async () => {
    const { dialog, clickDeleteButton } = renderComponent();
    await clickDeleteButton();
    expect(dialog()).toBeInTheDocument();
    expect(
      within(dialog()).getByText('문장을 삭제하시겠습니까?')
    ).toBeInTheDocument();
  });

  it('취소 버튼을 클릭하면 모달이 사라진다.', async () => {
    const { clickDeleteButton, clickDialogCancel } = renderComponent();
    await clickDeleteButton();
    await clickDialogCancel();
    const dialog = screen.queryByRole('dialog');
    await waitFor(() => expect(dialog).not.toBeInTheDocument());
  });

  it('확인 버튼을 클릭하면 모달이 화면에서 사라지고, sentence와 함께 handleDelete 함수가 호출된다.', async () => {
    const { clickDeleteButton, clickDialogConfirm } = renderComponent();
    await clickDeleteButton();
    await clickDialogConfirm();
    const dialog = screen.queryByRole('dialog');
    await waitFor(() => expect(dialog).not.toBeInTheDocument());
    expect(handleDeleteFn).toHaveBeenNthCalledWith(1, MockSentences[0]);
  });
});

const wrapWithRoutes = (
  <Routes>
    <Route
      path='/my/sentence'
      element={
        <UserSentenceList
          sentences={SentencePagiantionResult}
          handleDelete={handleDeleteFn}
        />
      }
    />
    <Route path='/edit/sentence/:id' element={<h1>Edit Sentence</h1>} />
  </Routes>
);

const renderComponent = (initialEntries: string[] = ['/my/sentence']) => {
  const { user } = render(wrapWithRoutes, {
    routerProps: { initialEntries },
  });
  // pagination도 list에 해당한다. 첫번째가 sentence list
  const list = () => screen.getAllByRole('list')[0];
  const listItems = () => within(list()).getAllByRole('listitem');
  const firstListItem = () => listItems()[0];
  const editButton = () =>
    within(firstListItem()).getByRole('link', { name: '수정' });
  const deleteButton = () =>
    within(firstListItem()).getByRole('button', { name: '삭제' });
  const dialog = () => screen.getByRole('dialog');
  const cancelInDialog = () =>
    within(dialog()).getByRole('button', { name: '취소' });
  const confirmInDialog = () =>
    within(dialog()).getByRole('button', { name: '확인' });

  const clickEditButton = async () => await user.click(editButton());
  const clickDeleteButton = async () => await user.click(deleteButton());
  const clickDialogCancel = async () => await user.click(cancelInDialog());
  const clickDialogConfirm = async () => await user.click(confirmInDialog());
  return {
    user,
    listItems,
    dialog,
    clickEditButton,
    clickDeleteButton,
    clickDialogCancel,
    clickDialogConfirm,
  };
};
