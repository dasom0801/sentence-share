/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { colors } from '@mui/material';

import { textOverflowHidden, lineClamp, mq } from '@/styles';
import { memo } from 'react';

type SentenceTextCardProps = {
  sentence: Sentence;
};

const SentenceTextCard: React.FC<SentenceTextCardProps> = memo(
  function SentenceTextCard({ sentence }) {
    return (
      <div css={commonStyles}>
        <p>{sentence.content}</p>
        <div>
          {sentence.book?.title} - {sentence.book?.author?.join(',')}
        </div>
      </div>
    );
  },
);

const commonStyles = css`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  padding: 16px;
  border-radius: 8px;
  box-shadow:
    inset -1px -1px 0px 0px rgba(0, 0, 0, 0.25),
    inset 1px 1px 0px 0px rgba(0, 0, 0, 0.25);
  &:hover {
    p {
      text-decoration: inherit;
    }
  }

  p {
    ${lineClamp(3)};
    color: ${colors.blueGrey[800]};
    font-size: 16px;
    font-weight: 500;
    text-align: center;
  }

  > div {
    margin: 8px 0 0 0;
    color: ${colors.blueGrey[500]};
    text-align: right;
    ${textOverflowHidden};
  }

  ${mq.md} {
    p {
      font-size: 18px;
    }
  }
`;

export default SentenceTextCard;
