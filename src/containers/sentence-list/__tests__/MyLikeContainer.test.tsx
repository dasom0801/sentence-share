import { BrowserRouter } from 'react-router-dom';
import { renderWithReactQuery } from '../../../test-utils/testRender';
import MyLikeContainer from '../MyLikeContainer';
import { screen } from '@testing-library/react';
import { MockSentence } from '../../../test-utils/index.mock';
import * as hooks from '../hooks/useUserLikeQuery';
import { UseQueryResult } from '@tanstack/react-query';

const renderComponent = () => {
  renderWithReactQuery(<MyLikeContainer />, { wrapper: BrowserRouter });
  const LikeListItem = async () => await screen.findAllByRole('listitem');
  return { LikeListItem };
};

describe('MyLikeContainer', () => {
  const useUserLikeQuerySpy = vi.spyOn(hooks, 'useUserLikeQuery');
  afterEach(() => {
    useUserLikeQuerySpy.mockClear();
  });

  test('사용자가 좋아한 문장 목록을 화면에 보여준다.', async () => {
    const total = 10;
    const list = Array.from(new Array(total), (_, index) => ({
      ...MockSentence,
      _id: `${index}`,
    }));

    useUserLikeQuerySpy.mockReturnValue({
      data: {
        list,
        total,
        page: 1,
        limit: 20,
      },
    } as UseQueryResult<PaginationResult<Sentence>>);
    const { LikeListItem } = renderComponent();
    const listItems = await LikeListItem();
    expect(listItems).toHaveLength(total);
  });
});
