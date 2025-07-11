import { Book } from '@/types';
import BookListItem from '../BookListItem';
import classes from './BookSearchList.module.scss';

type BookSearchListProps = {
  books: Book[];
  handleOnClickBook: (book: Book) => void;
};

export default function BookSearchList({
  books,
  handleOnClickBook,
}: BookSearchListProps) {
  return (
    <ul className={classes.list}>
      {books.map((book: Book, index: number) => (
        <li
          onClick={() => handleOnClickBook(book)}
          key={`${book.isbn}-${index}`}
        >
          <BookListItem book={book} />
        </li>
      ))}
    </ul>
  );
}
