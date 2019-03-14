import React from 'react';

const BookResultItem = ({ book, selectBook}) => {

  return (
    <li onClick={() => selectBook(book)}>
      <img src={book.bookImage} alt="책표지" />
      <p>{book.bookTitle}</p>
      <p>{book.author.join(",")} | {book.publisher}</p>
    </li>
  );
}
 
export default BookResultItem;