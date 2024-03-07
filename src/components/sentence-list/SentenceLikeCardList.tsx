/** @jsxImportSource @emotion/react */

import { css } from '@mui/material';
import { gridContainer } from '../../styles';
import SentenceCard from './SentenceCard';
import SentenceCardSkeleton from './SentenceCardSkeleton';
import { FaHeart, FaRegHeart } from 'react-icons/fa6';
import { red } from '@mui/material/colors';
import Button from '../common/Button';

type SentenceCardListParams = {
  list: Sentence[] | undefined;
  isLoading?: boolean;
  skeletonLength?: number;
  onToggleLike: (id: string) => void;
};

const SentenceLikeCardList = ({
  list,
  isLoading,
  skeletonLength = 12,
  onToggleLike,
}: SentenceCardListParams) => {
  const skeletonList = Array.from({ length: skeletonLength }).map(
    (_, index) => <SentenceCardSkeleton key={index} />
  );
  const sentenceList = list?.map((sentence) => (
    <SentenceCard key={sentence._id} sentence={sentence}>
      <Button
        css={buttonStyle}
        size='large'
        color='secondary'
        fullWidth={true}
        onClick={() => onToggleLike(sentence._id)}
      >
        <span>좋아요</span>
        {sentence.isLiked ? <FaHeart /> : <FaRegHeart />}
      </Button>
    </SentenceCard>
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
