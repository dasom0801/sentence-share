import React from 'react';

const BookResultItem = ({ book, selectBook}) => {
  return (
    <li onClick={() => selectBook(book)}>
      <img src={book.bookImage} alt="책표지" />
      <p className="title">{book.bookTitle}</p>
      <p className="info">{book.author.join(",")} | {book.publisher}</p>
    </li>
  );
}
 
export default BookResultItem;