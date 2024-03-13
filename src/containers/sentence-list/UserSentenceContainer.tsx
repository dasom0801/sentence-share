/** @jsxImportSource @emotion/react */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { css } from '@emotion/react';
import { Button, Pagination } from '@mui/material';

import { AlertDialog, SentenceCard, SentenceListSkeleton } from '@/components';
import { usePagination, useUserQuery } from '@/lib';
import { gridContainer, pageTitle, pagination } from '@/styles';
import { useUserSentenceQuery } from './hooks/useUserSentenceQuery';
import { useDeleteSentence } from './hooks/useDeleteSentence';

const UserSentenceContainer = () => {
  const navigate = useNavigate();
  const [deleteTarget, setDeleteTarget] = useState<Sentence | null>(null);
  const { page, setPage } = usePagination();
  const { data: currentUser } = useUserQuery();
  const {
    data: sentences,
    isLoading,
    isError,
    refetch,
  } = useUserSentenceQuery({
    userId: currentUser?._id,
    category: 'sentence',
    limit: 24,
    page,
  });
  const { mutate } = useDeleteSentence(refetch);

  const handleEditSentence = (id: string) => {
    navigate(`/edit/sentence/${id}`);
  };

  const handleDeleteSentence = () => {
    if (deleteTarget) {
      mutate(deleteTarget._id);
      setDeleteTarget(null);
    }
  };

  if (isError) return <></>;

  return (
    <>
      <div>
        <h1 css={pageTitle}>
          내가 공유한 문장 {sentences?.total && `(${sentences?.total})`}
        </h1>
      </div>
      {isLoading ? (
        <SentenceListSkeleton />
      ) : (
        <>
          <ul css={gridContainer}>
            {sentences?.list.map((sentence) => {
              return (
                <SentenceCard key={sentence._id} sentence={sentence}>
                  <div css={buttons}>
                    <Button
                      color='secondary'
                      size='large'
                      onClick={() => handleEditSentence(sentence._id)}
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
      )}
      ;
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
  button {
    flex: 1;
    border-radius: 0;
  }
`;

export default UserSentenceContainer;
