/** @jsxImportSource @emotion/react */
import { useUserQuery } from '../../lib/hooks';
import { useUserSentenceQuery } from './hooks/useUserSentenceQuery';
import { gridContainer, pageTitle } from '../../styles';
import { Button, SentenceCard, SentenceListSkeleton } from '../../components';
import { css } from '@emotion/react';

const UserSentenceContainer = () => {
  const { data: currentUser } = useUserQuery();
  const {
    data: sentences,
    isLoading,
    isError,
  } = useUserSentenceQuery({
    userId: currentUser?._id,
    category: 'sentence',
    limit: 24,
  });

  const handleEditSentence = (id: string) => {};

  const handleDeleteSentence = (id: string) => {};

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
