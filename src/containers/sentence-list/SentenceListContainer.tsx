/** @jsxImportSource @emotion/react */
import { useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { Pagination } from '@mui/material';

import { SentenceLikeCardList } from '@/components';
import { pagination } from '@/styles';
import { usePagination, useUserQuery } from '@/lib';
import useSentenceQuery, {
  queryKey as SentencseQueryKey,
} from './hooks/useSentenceQuery';
import { useToggleSentenceLike } from './hooks/useToggleSentenceLike';

const SentenceListContainer = () => {
  const queryClient = useQueryClient();
  const { data: currentUser } = useUserQuery();
  const { page, setPage } = usePagination();
  const { data, isLoading, isError, error } = useSentenceQuery({ page });
  const updateLikeListAfterToggle = (sentence: Sentence) => {
    const queryKey = SentencseQueryKey({ page });
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
export default SentenceListContainer;
