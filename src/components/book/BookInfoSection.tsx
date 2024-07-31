/** @jsxImportSource @emotion/react */

import { memo, PropsWithChildren } from 'react';
import { css } from '@emotion/react';
import { colors } from '@mui/material';
import BookInfoSectionSkeleton from './BookInfoSectionSkeleton';

type BookInfoSectionType = PropsWithChildren<{
  book?: Book;
  isLoading?: boolean;
}>;

const BookInfoSection: React.FC<BookInfoSectionType> = memo(
  function BookInfoSection({ book, isLoading, children }) {
    if (isLoading) return <BookInfoSectionSkeleton />;

    return (
      <section
        css={css`
          ${styles};
          background-image: url(${book?.coverUrl});
        `}
      >
        <div className="backdrop">
          <img src={book?.coverUrl} alt={book?.title} />
          <h2 className="title">{book?.title}</h2>
          <div>{book?.author.join(',')}</div>

          {children}
        </div>
      </section>
    );
  },
);

const styles = css`
  min-height: 419px;
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;

  .backdrop {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 40px;
    backdrop-filter: blur(10px);
    background-color: rgba(255, 255, 255, 0.7);
    overflow: hidden;

    img {
      margin: 0 0 16px;
      width: 180px;
      height: auto;
      border-radius: 4px;
      box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    }

    .title {
      margin: 0 0 8px;
      color: ${colors.blueGrey[900]};
      font-size: 20px;
      font-weight: 700;
    }
  }
`;
export default BookInfoSection;
