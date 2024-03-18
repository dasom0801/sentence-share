/** @jsxImportSource @emotion/react */
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { css } from '@emotion/react';
import { Button, Pagination } from '@mui/material';

import {
  AlertDialog,
  NoResult,
  SentenceCard,
  SentenceListSkeleton,
} from '@/components';
import { usePagination } from '@/lib/hooks';
import { useUserStore } from '@/store/user';
import { gridContainer, pageTitle, pagination } from '@/styles';
import { useUserSentenceQuery } from './hooks/useUserSentenceQuery';
import { useDeleteSentence } from './hooks/useDeleteSentence';

const UserSentenceContainer = () => {
  const [deleteTarget, setDeleteTarget] = useState<Sentence | null>(null);
  const { page, setPage } = usePagination();
  const { user } = useUserStore();

  const {
    data: sentences,
    isLoading,
    isError,
    refetch,
    error,
  } = useUserSentenceQuery({
    userId: user?._id,
    category: 'sentence',
    limit: 24,
    page,
  });
  const { mutate } = useDeleteSentence(refetch);

  const handleDeleteSentence = () => {
    if (deleteTarget) {
      mutate(deleteTarget._id);
      setDeleteTarget(null);
    }
  };

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
            <>
              <ul css={gridContainer}>
                {sentences?.list.map((sentence) => {
                  return (
                    <li key={sentence._id}>
                      <SentenceCard sentence={sentence}>
                        <div css={buttons}>
                          <Button
                            component={Link}
                            to={`/edit/sentence/${sentence._id}`}
                            color='secondary'
                            size='large'
                          >
                            수정
                          </Button>
                          <Button
                            variant='contained'
                            color='secondary'
                            size='large'
                            onClick={() => setDeleteTarget(sentence)}
                          >
                            삭제
                          </Button>
                        </div>
                      </SentenceCard>
                    </li>
                  );
                })}
              </ul>
              <div css={pagination}>
                <Pagination
                  count={sentences?.pageTotal || 1}
                  shape='rounded'
                  page={page}
                  onChange={(_, page) => setPage(page)}
                />
              </div>
            </>
          ) : (
            <NoResult
              title='문장이 없습니다.'
              description='내가 좋아하는 책 속의 문장을 모두와 공유해보세요.'
            >
              <Button component={Link} to='/edit/sentence' variant='contained'>
                작성하기
              </Button>
            </NoResult>
          )}
        </>
      )}
      <AlertDialog
        content='문장을 삭제하시겠습니까?'
        open={!!deleteTarget}
        handleClose={() => setDeleteTarget(null)}
        handleConfirm={() => handleDeleteSentence()}
      />
    </>
  );
};

const buttons = css`
  display: flex;
  > * {
    flex: 1;
    border-radius: 0;
  }
`;

export default UserSentenceContainer;
