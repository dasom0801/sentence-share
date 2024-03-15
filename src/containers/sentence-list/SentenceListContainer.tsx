/** @jsxImportSource @emotion/react */
import { useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { Pagination } from '@mui/material';
import { css } from '@emotion/react';

import { SentenceLikeCardList, SortButtons } from '@/components';
import { pagination } from '@/styles';
import { useSort, usePagination, useUserQuery } from '@/lib/hooks';

import useSentenceQuery, {
  queryKey as SentencseQueryKey,
} from './hooks/useSentenceQuery';
import { useToggleSentenceLike } from './hooks/useToggleSentenceLike';

const SentenceListContainer = () => {
  const queryClient = useQueryClient();
  const { data: currentUser } = useUserQuery();
  const { page, setPage } = usePagination();
  const { sort } = useSort();
  const { data, isLoading, isError, error } = useSentenceQuery({
    page,
    ...sort,
  });
  const updateLikeListAfterToggle = (sentence: Sentence) => {
    const queryKey = SentencseQueryKey({
      page,
      ...sort,
    });
    queryClient.setQueryData(queryKey, (result: PaginationResult<Sentence>) => {
      return {
        ...result,
        list: result.list?.map((liked) =>
          liked._id === sentence._id ? sentence : liked
        ),
      };
    });
  };
  const { mutate } = useToggleSentenceLike(updateLikeListAfterToggle);

  const handleToggleLike = (id: string) => {
    if (!currentUser) {
      toast.error('로그인 후 이용해주세요.');
      return;
    }
    mutate(id);
  };

  if (isError) {
    throw error;
  }

  return (
    <>
      <div css={buttonContainer}>
        <SortButtons />
      </div>

      <SentenceLikeCardList
        isLoading={isLoading}
        list={data?.list}
        onToggleLike={handleToggleLike}
      />
      <Pagination
        css={pagination}
        count={data?.pageTotal || 1}
        shape='rounded'
        page={page}
        onChange={(_, page) => setPage(page)}
      />
    </>
  );
};
const buttonContainer = css`
  display: flex;
  justify-content: flex-end;
  padding: 12px 0;
`;
export default SentenceListContainer;
