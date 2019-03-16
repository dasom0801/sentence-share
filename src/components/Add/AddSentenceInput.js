import React from 'react';
import Popup from '../App/Popup';

const AddSentenceInput = ({ selectedBook, checkInputAlert, showInputAlert, changeSentenceTextarea, sentenceTextValue, showPopup, togglePopup, popupMsg, resetBookState, history, userId, userName, userPicture, submitSentence}) => {
  const { bookImage, bookTitle, author, publisher } = selectedBook
  const handleTextareaSubmit = (event) => {
    event.preventDefault();
    if (sentenceTextValue.trim()) {
      checkInputAlert(false);
      const user = {userId, userName, userPicture};
      selectedBook.author = selectedBook.author.join(" ");
      submitSentence({user, selectedBook, sentenceTextValue});
      setTimeout(() => {
        resetBookState();
        history.push('/');
      }, 5000);
    } else {
      checkInputAlert(true);
    }
  }
  const alertPrint = showInputAlert ? (<p className="alert">문장을 입력해주세요.</p>) : '';
  const popupPrint = showPopup ? <Popup popupMsg={popupMsg} togglePopup={togglePopup} target="book" resetBookState={resetBookState} history={history}/> : '';
  return ( 
    <div className="add-sentence-input">
      <div className="book-info">
        <img src={bookImage} alt="책표지" />
        <p className="book-title">{bookTitle}</p>
        <p>{author} | {publisher}</p>
      </div>
      <form onSubmit={(event) => { handleTextareaSubmit(event)}}>
        <textarea cols="30" rows="10" value={sentenceTextValue} onChange={(event) => { changeSentenceTextarea(event.currentTarget.value)}} />
        <button type="button" onClick={() => { togglePopup('취소')}}>취소</button>
        <button type="submit">완료</button>
        {alertPrint}
      </form>
      {popupPrint}
    </div>
   );
}
 
export default AddSentenceInput;