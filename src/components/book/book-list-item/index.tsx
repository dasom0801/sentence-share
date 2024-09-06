import BookCoverImage from '@components/book/book-cover-image';
import classes from './indes.module.scss';

type BookListItemProps = {
  book: Book;
};

export default function BookListItem({ book }: BookListItemProps) {
  return (
    <div className={classes.listItem}>
      <BookCoverImage coverUrl={book.coverUrl} alt={book.title} />
      <div className={classes.bookInfo}>
        <div className={classes.title}>{book.title}</div>
        <div>{book.author?.join(',')}</div>
        <div>{book.publisher}</div>
      </div>
    </div>
  );
}
