/** @jsxImportSource @emotion/react */

import { Link } from 'react-router-dom';
import { Pagination, Button } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';
import { css } from '@emotion/react';
import { NoResult, SentenceLikeCardList } from '@/components';
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
    error,
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

  if (isError) {
    throw error;
  }

  return (
    <>
      {!!likes?.total ? (
        <>
          <h1 css={pageTitle}>내가 좋아한 문장 {`(${likes?.total})`}</h1>
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
      ) : (
        <>
          <h1 css={pageTitle}>내가 좋아한 문장</h1>
          <NoResult
            title='문장이 없습니다.'
            description='다른 사람들이 공유한 책 속의 문장을 확인해 보세요!'
          >
            <Link to={'/'}>
              <Button variant='contained'>목록 보기</Button>
            </Link>
          </NoResult>
        </>
      )}
    </>
  );
};

const noResultStyles = css`
  background-color: yellow;
  height: 80%;
`;

export default UserLikeContainer;
