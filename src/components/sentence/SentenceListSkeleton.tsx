/** @jsxImportSource @emotion/react */

import { gridContainer } from '../../styles';
import SentenceCardSkeleton from './SentenceCardSkeleton';

const SentenceListSkeleton: React.FC<{ length?: number }> = ({
  length = 12,
}) => {
  return (
    <ul css={gridContainer}>
      {Array.from({ length }).map((_, index) => (
        <li key={index}>
          <SentenceCardSkeleton />
        </li>
      ))}
    </ul>
  );
};
export default SentenceListSkeleton;
