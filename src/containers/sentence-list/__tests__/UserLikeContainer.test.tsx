import { BrowserRouter } from 'react-router-dom';
import { renderWithReactQuery } from '../../../test-utils/testRender';
import UserLikeContainer from '../UserLikeContainer';
import { screen, waitFor } from '@testing-library/react';
import { MockSentence } from '../../../test-utils/index.mock';
import * as useUserLike from '../hooks/useUserLikeQuery';
import { UseQueryResult } from '@tanstack/react-query';
import userEvent from '@testing-library/user-event';

const mocks = vi.hoisted(() => {
  return {
    mutate: vi.fn(),
  };
});

vi.mock('../hooks/useToggleSentenceLike', async () => {
  return {
    useToggleSentenceLike: () => ({ mutate: mocks.mutate }),
  };
});

describe('<UserLikeContainer />', () => {
  const useUserLikeQuerySpy = vi.spyOn(useUserLike, 'useUserLikeQuery');

  afterEach(() => {
    useUserLikeQuerySpy.mockClear();
  });

  test('사용자가 좋아한 문장 목록을 화면에 보여준다.', async () => {
    const data = getMockListData();
    useUserLikeQuerySpy.mockReturnValue({
      data,
    } as UseQueryResult<PaginationResult<Sentence>>);
    const { LikeListItem } = renderComponent();
    const listItems = await LikeListItem();
    expect(listItems).toHaveLength(data.total);
  });

  test('좋아요 버튼을 누르면 좋아요가 토글된다.', async () => {
    const { clickLikeButton } = renderComponent();
    const data = getMockListData();
    useUserLikeQuerySpy.mockReturnValue({
      data,
    } as UseQueryResult<PaginationResult<Sentence>>);

    clickLikeButton();
    // 버튼을 클릭하면 mutate가 호출된다.
    await waitFor(() => expect(mocks.mutate).toBeCalled());
    await waitFor(() => expect(mocks.mutate).toBeCalledWith('0'));
  });
});

const renderComponent = () => {
  const user = userEvent.setup();
  renderWithReactQuery(<UserLikeContainer />, { wrapper: BrowserRouter });
  const LikeListItem = async () => await screen.findAllByRole('listitem');
  const LikeButton = async () => await screen.findAllByRole('button');
  const clickLikeButton = async () => {
    const button = await LikeButton();
    await user.click(button[0]);
  };
  return { LikeListItem, clickLikeButton };
};

const getMockListData = () => {
  const total = 10;
  const list = Array.from(new Array(total), (_, index) => ({
    ...MockSentence,
    _id: `${index}`,
  }));

  return {
    list,
    total,
    page: 1,
    limit: 20,
  };
};
