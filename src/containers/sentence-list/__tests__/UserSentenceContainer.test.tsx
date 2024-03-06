import { screen } from '@testing-library/react';
import UserSentenceContainer from '../UserSentenceContainer';
import userEvent from '@testing-library/user-event';
import * as hooks from '../hooks/useUserSentenceQuery';
import { renderWithReactQuery } from '../../../test-utils/testRender';
import { UseQueryResult } from '@tanstack/react-query';
import { MockSentence } from '../../../test-utils/index.mock';
import { BrowserRouter } from 'react-router-dom';

const renderComponent = () => {
  const user = userEvent.setup();
  renderWithReactQuery(<UserSentenceContainer />, { wrapper: BrowserRouter });
  const SentenceListItem = async () => await screen.findAllByRole('listitem');
  const EditButton = async () =>
    await screen.findByRole('button', { name: '수정' });

  const DeleteButton = async () =>
    await screen.findByRole('button', { name: '삭제' });

  const clickEditButton = () => async () => {
    const Button = await EditButton();
    await user.click(Button);
  };

  const clickDeleteButton = () => async () => {
    const Button = await DeleteButton();
    await user.click(Button);
  };

  return { SentenceListItem, clickEditButton, clickDeleteButton };
};

describe('<UserSentenceContainer />', () => {
  const useUserSentenceQuerySpy = vi.spyOn(hooks, 'useUserSentenceQuery');
  afterEach(() => {
    useUserSentenceQuerySpy.mockClear();
  });
  test('사용자가 공유한 문장 목록을 화면에 보여준다.', async () => {
    const total = 10;
    const list = Array.from(new Array(total), (_, index) => ({
      ...MockSentence,
      _id: `${index}`,
    }));
    useUserSentenceQuerySpy.mockReturnValue({
      data: {
        list,
        total,
        page: 1,
        limit: 20,
      },
    } as UseQueryResult<PaginationResult<Sentence>>);
    const { SentenceListItem } = renderComponent();
    const listItems = await SentenceListItem();
    expect(listItems).toHaveLength(total);
  });

  // test('목록 아이템의 수정 버튼을 누르면 수정화면으로 이동한다.', () => {});
  // test('목록 아이템의 삭제 버튼을 누르면 문장을 삭제한다.', () => {});
});
