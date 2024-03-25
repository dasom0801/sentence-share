/** @jsxImportSource @emotion/react */

import { Link } from 'react-router-dom';
import { Pagination, Button } from '@mui/material';

import { NoResult, SentenceLikeCardList } from '@/components';
import { pageTitle, pagination } from '@/styles';
import { usePagination, useToggleSentenceLike } from '@/lib/hooks';
import { useUserStore } from '@/store/user';
import { useUserLikes } from './hooks/useUserLikes';
import useUpdateUserLikes from './hooks/useUpdateUserLikes';

const UserLikeContainer = () => {
  const { page, setPage } = usePagination();
  const user = useUserStore.use.user();
  const {
    data: likes,
    isLoading,
    isError,
    error,
  } = useUserLikes({ userId: user?._id });
  const updateUserLikes = useUpdateUserLikes({ userId: user?._id });

  const { mutate: toggleLike } = useToggleSentenceLike({
    onSuccess: updateUserLikes,
  });

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
            shape="rounded"
            page={page}
            onChange={(_, page) => setPage(page)}
          />
        </>
      ) : (
        <>
          <h1 css={pageTitle}>내가 좋아한 문장</h1>
          <NoResult
            title="문장이 없습니다."
            description="다른 사람들이 공유한 책 속의 문장을 확인해 보세요!"
          >
            <Link to={'/'}>
              <Button variant="contained">목록 보기</Button>
            </Link>
          </NoResult>
        </>
      )}
    </>
  );
};

export default UserLikeContainer;
