/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react';
import SentenceTextCard from './SentenceTextCard';
import { mq } from '@/styles';

type SentenceTextCardListProps = {
  sentences: Sentence[];
};

const SentenceTextCardList = ({ sentences }: SentenceTextCardListProps) => {
  return (
    <ul css={styles}>
      {sentences.map((sentence: Sentence) => {
        return (
          <li key={sentence._id}>
            <SentenceTextCard sentence={sentence} enableLink={true} />
          </li>
        );
      })}
    </ul>
  );
};

const styles = css`
  display: flex;
  overflow-x: auto;

  li {
    flex-shrink: 0;
    max-width: 100%;
  }

  ${mq.sm} {
    gap: 0 12px;

    li {
      width: calc(50% - 12px);
    }
  }

  ${mq.lg} {
    li {
      width: calc(33% - 12px);
    }
  }
`;
export default SentenceTextCardList;
