/** @jsxImportSource @emotion/react */

import { Pagination } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';
import { SentenceLikeCardList } from '@/components';
import { usePagination, useUserQuery } from '@/lib';
import { pageTitle, pagination } from '@/styles';
import { useToggleSentenceLike } from './hooks/useToggleSentenceLike';
import { UserLikeQueryKey, useUserLikeQuery } from './hooks/useUserLikeQuery';

const UserLikeContainer = () => {
  const queryClient = useQueryClient();
  const { page, setPage } = usePagination();
  const { data: currentUser } = useUserQuery();
  const {
    data: likes,
    isLoading,
    isError,
  } = useUserLikeQuery({ userId: currentUser?._id });
  const updateLikeListAfterToggle = (sentence: Sentence) => {
    const queryKey = UserLikeQueryKey({ userId: currentUser?._id });
    queryClient.setQueryData(queryKey, (result: PaginationResult<Sentence>) => {
      return {
        ...result,
        list: result.list?.map((liked) =>
          liked._id === sentence._id ? sentence : liked
        ),
      };
    });
  };
  const { mutate: toggleLike } = useToggleSentenceLike(
    updateLikeListAfterToggle
  );

  if (isError) return <></>;

  return (
    <>
      <h1 css={pageTitle}>
        내가 좋아한 문장 {likes?.total && `(${likes?.total})`}
      </h1>
      <SentenceLikeCardList
        isLoading={isLoading}
        list={likes?.list}
        onToggleLike={toggleLike}
      />
      <Pagination
        css={pagination}
        count={likes?.pageTotal || 1}
        shape='rounded'
        page={page}
        onChange={(_, page) => setPage(page)}
      />
    </>
  );
};

export default UserLikeContainer;
