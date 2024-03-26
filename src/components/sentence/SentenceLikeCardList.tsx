/** @jsxImportSource @emotion/react */

import { Button, css } from '@mui/material';
import { red } from '@mui/material/colors';
import { FaHeart, FaRegHeart } from 'react-icons/fa6';

import { gridContainer } from '@/styles';
import SentenceCard from './SentenceCard';
import SentenceCardSkeleton from './SentenceCardSkeleton';

type SentenceCardListParams = {
  list: Sentence[] | undefined;
  isLoading?: boolean;
  showBook?: boolean;
  skeletonLength?: number;
  onToggleLike: (id: string) => void;
};

const SentenceLikeCardList = ({
  list,
  isLoading,
  showBook = true,
  skeletonLength = 12,
  onToggleLike,
}: SentenceCardListParams) => {
  const skeletonList = Array.from({ length: skeletonLength }).map(
    (_, index) => <SentenceCardSkeleton key={index} />,
  );
  const sentenceList = list?.map((sentence) => (
    <li
      key={sentence._id}
      css={css`
        min-width: 0;
      `}
    >
      <SentenceCard sentence={sentence} showBook={showBook}>
        <Button
          css={buttonStyle}
          size="large"
          color="secondary"
          fullWidth={true}
          onClick={() => onToggleLike(sentence._id)}
        >
          <span>좋아요</span>
          {sentence.isLiked ? <FaHeart /> : <FaRegHeart />}
        </Button>
      </SentenceCard>
    </li>
  ));

  return (
    <ul css={gridContainer}>
      {isLoading || !list ? skeletonList : sentenceList}
    </ul>
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
export default SentenceLikeCardList;
