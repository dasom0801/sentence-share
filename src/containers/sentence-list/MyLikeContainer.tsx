/** @jsxImportSource @emotion/react */

import { useUserQuery } from '../../lib/hooks';
import { useUserLikeQuery } from './hooks/useUserLikeQuery';
import { gridContainer, pageTitle } from '../../styles';
import { SentenceCard, SentenceListSkeleton } from '../../components';

const MyLikeContainer = () => {
  const { data: currentUser } = useUserQuery();
  const {
    data: likes,
    isLoading,
    isError,
  } = useUserLikeQuery({ userId: currentUser?._id });

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
            return <SentenceCard key={sentence._id} sentence={sentence} />;
          })}
        </ul>
      )}
    </>
  );
};

export default MyLikeContainer;
