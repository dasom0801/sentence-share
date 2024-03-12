/** @jsxImportSource @emotion/react */
import { Link } from 'react-router-dom';
import { css } from '@emotion/react';
import { colors } from '@mui/material';

import { textOverflowHidden } from '@/styles';

type SentenceTextCardProps = {
  sentence: Sentence;
  enableLink?: boolean;
};

const TextContent = (sentence: Sentence) => {
  return (
    <>
      <p>{sentence.content}</p>
      <div>
        {sentence.book?.title} - {sentence.book?.author[0]}
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
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  p {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    color: ${colors.blueGrey[800]};
    font-size: 20px;
    font-weight: 700;
  }

  div {
    margin: 8px 0 0 0;
    color: ${colors.blueGrey[500]};
    text-align: right;
    ${textOverflowHidden};
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
