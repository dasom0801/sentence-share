import React from 'react';
import BookResultItem from './BookResultItem';

const AddSentenceInput = () => {
  return ( 
    <div className="add-sentence-input">
      <div className="book-info">
        <BookResultItem />
      </div>
      <textarea cols="30" rows="10" placeholder="문장을 입력해주세요" />
    </div>
   );
}
 
export default AddSentenceInput;