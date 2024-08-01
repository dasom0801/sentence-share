/** @jsxImportSource @emotion/react */

import { memo, useState } from 'react';
import { textOverflowHidden } from '@/styles';
import { css } from '@emotion/react';
import { colors } from '@mui/material';
import BookDefaultCover from './BookDefaultCover';

type BookListItemProps = {
  book: Book;
};

const BookListItem: React.FC<BookListItemProps> = memo(function ({ book }) {
  const [showDefaultCover, setShowDefaultCover] = useState(false);

  return (
    <div css={styles}>
      {showDefaultCover ? (
        <BookDefaultCover />
      ) : (
        <img
          src={book.coverUrl}
          alt={book.title}
          onError={() => setShowDefaultCover(true)}
          loading="lazy"
        />
      )}

      <div className="book-info">
        <div className="title">{book.title}</div>
        <div>{book.author?.join(',')}</div>
        <div>{book.publisher}</div>
      </div>
    </div>
  );
});

const styles = css`
  display: flex;
  align-items: center;
  gap: 16px;
  width: 100%;
  padding: 16px;
  border-radius: 8px;
  box-shadow: inset rgba(0, 0, 0, 0.24) 0 0 0 1px;
  overflow: hidden;
  cursor: pointer;

  &:hover {
    background-color: rgba(0, 0, 0, 0.03);
  }

  img {
    width: auto;
    height: 120px;
    border-radius: 4px;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  }

  .book-info {
    min-width: 0px;

    div {
      text-align: left;
      color: ${colors.blueGrey[500]};
      font-size: 14px;
      ${textOverflowHidden};
    }

    .title {
      margin: 0 0 8px;
      color: ${colors.blueGrey[900]};
      font-weight: 500;
      font-size: 18px;
    }
  }
`;

export default BookListItem;
