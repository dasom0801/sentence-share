import React from 'react';
import ListItem from '../List/ListItem';

const BookDetail = () => {
  return ( 
    <div className="book-detail">
      <div className="book-info">
        <img src="" alt="책표지"/>
        <p>제목</p>
        <p>저자</p>
        <p>출판사</p>
      </div>
      <div className="result-tab">
        <button type="button" className="all active">전체문장(15)</button>
        <button type="button" className="mine">내문장(1)</button>
      </div>
      <ul className="result-list">
        <li>
          <ListItem />
        </li>
      </ul>
    </div>
   );
}
 
export default BookDetail;