/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import SentenceCard from '../../components/common/SentenceCard';
import { useUserQuery } from '../../lib/hooks';
import { useUserSentenceQuery } from './hooks/useUserSentenceQuery';

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
        <h1 css={title}>
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

const title = css`
  margin-bottom: 24px;
  font-size: 24px;
  font-weight: 500;
`;

const gridContainer = css`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 24px;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

export default MySentenceContainer;
