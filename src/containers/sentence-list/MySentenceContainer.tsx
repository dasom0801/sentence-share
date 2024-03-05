/** @jsxImportSource @emotion/react */
import SentenceCard from '../../components/common/SentenceCard';
import { useUserQuery } from '../../lib/hooks';
import { useUserSentenceQuery } from './hooks/useUserSentenceQuery';
import { gridContainer, pageTitle } from '../../styles';

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

  if (isLoading) {
    return <></>;
  }

  if (isError) return <></>;

  return (
    <>
      <div>
        <h1 css={pageTitle}>
          내가 공유한 문장 {sentences?.total && `(${sentences?.total})`}
        </h1>
      </div>

      <ul css={gridContainer}>
        {sentences?.list.map((sentence) => {
          return <SentenceCard key={sentence._id} sentence={sentence} />;
        })}
      </ul>
    </>
  );
};

export default MySentenceContainer;
