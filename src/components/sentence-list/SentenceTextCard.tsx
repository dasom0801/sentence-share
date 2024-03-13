/** @jsxImportSource @emotion/react */
import { Link } from 'react-router-dom';
import { css } from '@emotion/react';
import { colors } from '@mui/material';

import { textOverflowHidden, lineClamp } from '@/styles';

type SentenceTextCardProps = {
  sentence: Sentence;
  enableLink?: boolean;
};

const TextContent = (sentence: Sentence) => {
  return (
    <>
      <p>{sentence.content}</p>
      <div>
        {sentence.book?.title} - {sentence.book?.author?.join(',')}
      </div>
    </>
  );
};

const SentenceTextCard = ({ sentence, enableLink }: SentenceTextCardProps) => {
  if (enableLink) {
    return (
      <Link
        css={css`
          ${commonStyles};
          ${linkStyles};
        `}
        to={`/sentence/${sentence._id}`}
      >
        <TextContent {...sentence} />
      </Link>
    );
  } else {
    return (
      <div css={commonStyles}>
        <TextContent {...sentence} />
      </div>
    );
  }
};

const commonStyles = css`
  padding: 16px;
  border-radius: 8px;
  box-shadow: inset -1px -1px 0px 0px rgba(0, 0, 0, 0.25),
    inset 1px 1px 0px 0px rgba(0, 0, 0, 0.25);

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

  @media (min-width: 768px) {
    p {
      font-size: 18px;
    }
  }
`;

const linkStyles = css`
  display: block;
  &:hover {
    p {
      text-decoration: underline;
    }
  }
`;
export default SentenceTextCard;
