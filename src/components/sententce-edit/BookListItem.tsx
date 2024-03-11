/** @jsxImportSource @emotion/react */

import { textOverflowHidden } from '@/styles';
import { css } from '@emotion/react';
import { colors } from '@mui/material';

type BookListItemProps = {
  book: Book;
  onClick: () => void;
};

const BookListItem = ({ book, onClick }: BookListItemProps) => {
  return (
    <li css={styles} onClick={onClick}>
      <img src={book.coverUrl} alt={book.title} />
      <div>
        <div className='title'>{book.title}</div>
        <div>{book.author.join(',')}</div>
        <div>{book.publisher}</div>
      </div>
    </li>
  );
};
const styles = css`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px;
  border-radius: 8px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  overflow: hidden;

  img {
    width: auto;
    height: 120px;
    border-radius: 4px;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  }

  > div {
    min-width: 0px;

    div {
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
