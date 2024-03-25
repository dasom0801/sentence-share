/** @jsxImportSource @emotion/react */
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';

import { NoResult, SentenceListSkeleton } from '@/components';
import { usePagination } from '@/lib/hooks';
import { useUserStore } from '@/store/user';
import { pageTitle } from '@/styles';
import { useDeleteSentence } from './hooks/useDeleteSentence';
import { useUserSentences } from './hooks/useUserSentences';
import UserSentenceList from './UserSentenceList';

const SENTENCE_PAGE_LIMIT = 24;
const UserSentenceContainer = ({ limit = SENTENCE_PAGE_LIMIT }) => {
  const { page } = usePagination();
  const user = useUserStore.use.user();

  const {
    data: sentences,
    isLoading,
    isError,
    refetch,
    error,
  } = useUserSentences({
    userId: user?._id,
    limit,
    page,
  });
  const { mutate } = useDeleteSentence(refetch);

  if (isError) {
    throw error;
  }

  return (
    <>
      <div>
        <h1 css={pageTitle}>
          내가 공유한 문장 {!!sentences?.total && `(${sentences?.total})`}
        </h1>
      </div>
      {isLoading ? (
        <SentenceListSkeleton />
      ) : (
        <>
          {!!sentences?.total ? (
            <UserSentenceList
              sentences={sentences}
              handleDelete={(sentence) => mutate(sentence._id)}
            />
          ) : (
            <NoResult
              title="문장이 없습니다."
              description="내가 좋아하는 책 속의 문장을 모두와 공유해보세요."
            >
              <Button component={Link} to="/edit/sentence" variant="contained">
                작성하기
              </Button>
            </NoResult>
          )}
        </>
      )}
    </>
  );
};

export default UserSentenceContainer;
