import React from 'react';
import BookSearch from './BookSearch';
import AddSentenceInput from './AddSentenceInput';

const AddSentence = ({ inputBookSearch, searchKeyword, searchBookInfo, bookList, isBookSelected, selectBook, showBookInfoInput, checkInputAlert, showInputAlert, selectedBook, sentenceTextValue, changeSentenceTextarea, togglePopup, showPopup, popupMsg, resetBookState, history, userId, userName, userPicture, submitSentence, match, modifySentence, changeLoadingStatus, isLoading, toggleModifyButton, bookSearchPage, pageableCount}) => {
  
  const printComponent = isBookSelected ? 
  <AddSentenceInput 
      selectedBook={selectedBook}
      checkInputAlert={checkInputAlert}
      showInputAlert={showInputAlert}
      sentenceTextValue={sentenceTextValue}
      changeSentenceTextarea={changeSentenceTextarea}
      togglePopup={togglePopup}
      showPopup={showPopup}
      popupMsg={popupMsg}
      resetBookState={resetBookState}
      submitSentence={submitSentence}
      history={history}
      userId={userId}
      userName={userName}
      userPicture={userPicture}
      match={match}
      modifySentence={modifySentence}
      changeLoadingStatus={changeLoadingStatus}
      isLoading={isLoading}
      toggleModifyButton={toggleModifyButton}
  /> 
    : (<BookSearch
      keyword={searchKeyword}
      inputBookSearch={inputBookSearch}
      searchBookInfo={searchBookInfo}
      bookList={bookList}
      selectBook={selectBook}
      showBookInfoInput={showBookInfoInput}
      checkInputAlert={checkInputAlert}
      showInputAlert={showInputAlert}
      bookSearchPage={bookSearchPage}
      pageableCount={pageableCount}
    />); 
  return ( 
    <div className="add-sentence">
      <p>새 문장 추가</p>
      {printComponent}
    </div>
   );
}
 
export default AddSentence;