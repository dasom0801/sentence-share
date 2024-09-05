'use client';

/** @jsxImportSource @emotion/react */

import { Button, css } from '@mui/material';
import { red } from '@mui/material/colors';
import { FaHeart, FaRegHeart } from 'react-icons/fa6';

import { gridContainer } from '@/styles';
import SentenceCard from './SentenceCard';
import SentenceCardSkeleton from './SentenceCardSkeleton';
import { memo, useMemo } from 'react';

type SentenceCardListParams = {
  list: Sentence[] | undefined;
  isLoading?: boolean;
  showBook?: boolean;
  skeletonLength?: number;
  onToggleLike: (id: string) => void;
};

const SentenceLikeCardList: React.FC<SentenceCardListParams> = memo(
  function SentenceLikeCardList({
    list,
    isLoading,
    showBook = true,
    skeletonLength = 12,
    onToggleLike,
  }) {
    const skeletonList = useMemo(
      () =>
        Array.from({ length: skeletonLength }).map((_, index) => (
          <SentenceCardSkeleton key={index} />
        )),
      [skeletonLength],
    );
    const sentenceList = useMemo(
      () =>
        list?.map((sentence) => (
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
        )),
      [list, onToggleLike, showBook],
    );

    return (
      <ul css={gridContainer}>
        {isLoading || !list ? skeletonList : sentenceList}
      </ul>
    );
  },
);

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
