/** @jsxImportSource @emotion/react */
import { useUserQuery } from '../../lib/hooks';
import { useUserSentenceQuery } from './hooks/useUserSentenceQuery';
import { gridContainer, pageTitle } from '../../styles';
import { SentenceCard, SentenceListSkeleton } from '../../components';

const MySentenceContainer = () => {
  const { data: currentUser } = useUserQuery();
  const {
    data: sentences,
    isLoading,
    isError,
  } = useUserSentenceQuery({
    userId: currentUser?._id,
    limit: 24,
  });

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
            return <SentenceCard key={sentence._id} sentence={sentence} />;
          })}
        </ul>
      )}
    </>
  );
};

export default MySentenceContainer;
