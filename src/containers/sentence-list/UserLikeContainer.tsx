/** @jsxImportSource @emotion/react */

import { useUserQuery } from '../../lib/hooks';
import { UserLikeQueryKey, useUserLikeQuery } from './hooks/useUserLikeQuery';
import { gridContainer, pageTitle } from '../../styles';
import { Button, SentenceCard, SentenceListSkeleton } from '../../components';
import { FaHeart } from 'react-icons/fa6';
import { FaRegHeart } from 'react-icons/fa6';
import { red } from '@mui/material/colors';
import { css } from '@emotion/react';
import { useToggleSentenceLike } from './hooks/useToggleSentenceLike';
import { useQueryClient } from '@tanstack/react-query';

const UserLikeContainer = () => {
  const queryClient = useQueryClient();
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
  const { mutate } = useToggleSentenceLike(updateLikeListAfterToggle);

  const toggleLike = (id: string) => {
    mutate(id);
  };

  if (isError) return <></>;

  return (
    <>
      <h1 css={pageTitle}>
        내가 좋아한 문장 {likes?.total && `(${likes?.total})`}
      </h1>

      {isLoading ? (
        <SentenceListSkeleton />
      ) : (
        <ul css={gridContainer}>
          {likes?.list.map((sentence) => {
            return (
              <SentenceCard key={sentence._id} sentence={sentence}>
                <Button
                  css={buttonStyle}
                  size='large'
                  color='secondary'
                  fullWidth={true}
                  onClick={() => toggleLike(sentence._id)}
                >
                  <span>좋아요</span>
                  {sentence.isLiked ? <FaHeart /> : <FaRegHeart />}
                </Button>
              </SentenceCard>
            );
          })}
        </ul>
      )}
    </>
  );
};

const buttonStyle = css`
  display: flex;
  align-items: center;
  gap: 6px;
  span {
    font-size: 16px;
  }
  svg {
    color: ${red[500]};
  }
`;
export default UserLikeContainer;
