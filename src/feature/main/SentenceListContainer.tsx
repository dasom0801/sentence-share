/** @jsxImportSource @emotion/react */
import toast from 'react-hot-toast';
import { Pagination } from '@mui/material';
import { css } from '@emotion/react';

import { SentenceLikeCardList, SortButtons } from '@/components';
import { pagination } from '@/styles';
import { useSort, usePagination, useToggleSentenceLike } from '@/lib/hooks';
import { useUserStore } from '@/store/user';
import useSentencesQuery, {
  queryKey as SentencesQueryKey,
} from './hooks/useSentencesQuery';

const SentenceListContainer = () => {
  const user = useUserStore.use.user();
  const { page, setPage } = usePagination();
  const { sort } = useSort();
  const { data, isLoading, isError, error } = useSentencesQuery({
    page,
    ...sort,
  });
  const { mutate } = useToggleSentenceLike({
    updateQueryKey: SentencesQueryKey({
      page,
      ...sort,
    }),
  });

  const handleToggleLike = (id: string) => {
    if (!user) {
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
        shape="rounded"
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
