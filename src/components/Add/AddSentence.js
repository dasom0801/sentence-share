import React from 'react';
import BookSearch from './BookSearch';
import AddSentenceInput from './AddSentenceInput';

const AddSentence = () => {
  return ( 
    <div className="add-sentence">
      <p>새 문장 추가</p>
      <BookSearch />
      <AddSentenceInput />
      <button type="button">완료</button>
    </div>
   );
}
 
export default AddSentence;