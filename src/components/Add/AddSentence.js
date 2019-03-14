import React from 'react';
import BookSearch from './BookSearch';
import AddSentenceInput from './AddSentenceInput';

const AddSentence = ({ inputBookSearch, searchKeyword, searchBookInfo, bookList, isBookSelected, selectBook}) => {
  const printComponent = isBookSelected ? 
  <AddSentenceInput /> 
    : (<BookSearch
      keyword={searchKeyword}
      inputBookSearch={inputBookSearch}
      searchBookInfo={searchBookInfo}
      bookList={bookList}
      selectBook={selectBook}
    />); 
  return ( 
    <div className="add-sentence">
      <p>새 문장 추가</p>
      {printComponent}
    </div>
   );
}
 
export default AddSentence;