import React from 'react';

const BookInfoInput = () => {
  return ( 
    <div className="book-info-input">
      <label for="title">제목</label>
      <input type="text" id="title" placeholder="제목을 입력해주세요" />
      <label for="author">저자</label>
      <input type="text" id="author" placeholder="저자를 입력해주세요"/>
      <label for="publisher">출판사</label>
      <input type="text" id="publisher" placeholder="출판사를 입력해주세요"/>
      <button type="button">완료</button>
    </div>
   );
}
 
export default BookInfoInput;