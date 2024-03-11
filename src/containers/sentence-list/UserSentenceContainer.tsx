/** @jsxImportSource @emotion/react */
import { usePagination, useUserQuery } from '@/lib';
import { useUserSentenceQuery } from './hooks/useUserSentenceQuery';
import { gridContainer, pageTitle, pagination } from '@/styles';
import { Button, SentenceCard, SentenceListSkeleton } from '@/components';
import { css } from '@emotion/react';
import { useNavigate } from 'react-router-dom';
import { useDeleteSentence } from './hooks/useDeleteSentence';
import { Pagination } from '@mui/material';

const UserSentenceContainer = () => {
  const navigate = useNavigate();
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
    navigate(`/my/sentence/${id}`);
  };

  const handleDeleteSentence = (id: string) => {
    mutate(id);
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
                      onClick={() => handleDeleteSentence(sentence._id)}
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
