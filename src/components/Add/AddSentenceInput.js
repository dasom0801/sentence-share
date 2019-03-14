import React from 'react';
// import BookResultItem from './BookResultItem';

const AddSentenceInput = () => {
  return ( 
    <div className="add-sentence-input">
      <div className="book-info">
        <p>선택된 책 정보 출력</p>
      </div>
      <textarea cols="30" rows="10" placeholder="문장을 입력해주세요" />
      <button type="button">완료</button>
    </div>
   );
}
 
export default AddSentenceInput;