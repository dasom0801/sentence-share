/** @jsxImportSource @emotion/react */
import { Link } from 'react-router-dom';
import { css } from '@emotion/react';
import { mq } from '@/styles';
import SentenceTextCard from './SentenceTextCard';

type SentenceTextCardListProps = {
  sentences: Sentence[];
};

const SentenceTextCardList = ({ sentences }: SentenceTextCardListProps) => {
  return (
    <ul css={styles}>
      {sentences.map((sentence: Sentence) => {
        return (
          <li key={sentence._id}>
            <Link to={`/sentence/${sentence._id}`}>
              <SentenceTextCard sentence={sentence} />
            </Link>
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

    a {
      cursor: pointer;
    }

    a:hover {
      p {
        text-decoration: underline;
      }
    }
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
