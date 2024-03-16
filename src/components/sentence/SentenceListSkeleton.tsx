/** @jsxImportSource @emotion/react */

import { gridContainer } from '../../styles';
import SentenceCardSkeleton from './SentenceCardSkeleton';

const SentenceListSkeleton = ({ length = 12 }: { length?: number }) => {
  return (
    <ul css={gridContainer}>
      {Array.from({ length }).map((_, index) => (
        <SentenceCardSkeleton key={index} />
      ))}
    </ul>
  );
};
export default SentenceListSkeleton;
