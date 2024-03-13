/** @jsxImportSource @emotion/react */

import { usePagination, useUserQuery } from '@/lib';
import useSentenceQuery, {
  queryKey as SentencseQueryKey,
} from './hooks/useSentenceQuery';
import { useQueryClient } from '@tanstack/react-query';
import { useToggleSentenceLike } from './hooks/useToggleSentenceLike';
import { SentenceLikeCardList } from '@/components';
import { Pagination } from '@mui/material';
import { pagination } from '@/styles';
import toast from 'react-hot-toast';

const SentenceListContainer = () => {
  const queryClient = useQueryClient();
  const { data: currentUser } = useUserQuery();
  const { page, setPage } = usePagination();
  const { data, isLoading, isError } = useSentenceQuery({ page });
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
