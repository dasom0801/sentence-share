/** @jsxImportSource @emotion/react */

import { memo, PropsWithChildren } from 'react';
import { Link } from 'react-router-dom';
import { css } from '@emotion/react';
import { blueGrey } from '@mui/material/colors';

import { lineClamp, textOverflowHidden } from '@/styles';
import UserInfo from '../common/UserInfo';

type SentenceCardProps = PropsWithChildren<{
  sentence: Sentence;
  showBook?: boolean;
}>;

const SentenceCard: React.FC<SentenceCardProps> = memo(function SentenceCard({
  sentence,
  showBook = true,
  children,
}) {
  const { author, book, content, createdAt } = sentence;
  return (
    <div
      css={css`
        ${container};
        background-image: url(${book?.coverUrl});
      `}
    >
      <div className="backdrop">
        <div className="header">
          <UserInfo user={author} />
          <time>{createdAt.split('T')[0]}</time>
        </div>

        <Link className="sentence" to={`/sentence/${sentence?._id}`}>
          <p>{content}</p>
        </Link>
        {showBook && (
          <Link className="book-info" to={`/book/${book?._id}`}>
            <div>
              <div className="title">{book?.title}</div>
              <div>{book?.author.join(',')}</div>
            </div>
            <img src={book?.coverUrl} alt={book?.title} loading="lazy" />
          </Link>
        )}

        <div className="children-container">{children}</div>
      </div>
    </div>
  );
});

const container = css`
  overflow: hidden;
  border-radius: 8px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  // backdrop-filter에 overflow hidden 적용하기 위해서 추가
  -webkit-filter: blur(0px);

  .backdrop {
    backdrop-filter: blur(30px);
    background-color: rgba(255, 255, 255, 0.65);
    overflow: hidden;
  }

  .header {
    display: flex;
    align-items: center;
    gap: 0 4px;
    padding: 8px 16px;
    background-color: white;

    > div {
      min-width: 0;
      flex: 1;
    }

    time {
      color: ${blueGrey[600]};
      font-size: 12px;
    }
  }

  .sentence {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 200px;
    padding: 0 16px;

    &:hover {
      text-decoration: underline;
    }

    p {
      ${lineClamp(3)}
      color: ${blueGrey[900]};
      font-size: 24px;
      font-weight: 500;
      text-align: center;
    }
  }

  .book-info {
    position: relative;
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 16px;
    height: 100px;
    overflow: hidden;
    background-color: rgba(255, 255, 255, 0.4);

    &:hover {
      text-decoration: underline;
      background-color: rgba(255, 255, 255, 0.55);
      transition: all 0.05s ease-in;

      img {
        transform: scale(1.03);
        transition: all 0.05s ease-in;
      }
    }

    > div {
      flex: 1;
      overflow: hidden;

      .title {
        color: ${blueGrey[900]};
        font-weight: 500;
        font-size: 18px;
      }

      div {
        color: ${blueGrey[600]};
        font-size: 16px;
        ${textOverflowHidden};
      }
    }

    img {
      position: relative;
      top: 16px;
      width: auto;
      height: 170%;
      box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    }
  }

  .children-container {
    background: white;
  }
`;

export default SentenceCard;
