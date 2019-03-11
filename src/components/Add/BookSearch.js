import React from 'react';
import BookResultItem from './BookResultItem';
import BookInfoInput from './BookInfoInput';
const AddBookSearch = () => {
  return ( 
    <div className="book-search">
      <input type="text" pacleholder="책 이름은 입력하세요" />
      <ul className="book-search-result">
        <li>
          <BookResultItem />
        </li>
      </ul>
      <div className="no-result">
        <p>찾으시는 결과가 없나요?</p>
        <button type="button">직접 입력</button>
        <BookInfoInput /> 
      </div>
    </div>
   );
}
 
export default AddBookSearch;