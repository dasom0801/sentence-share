import React from 'react';
import Popup from '../App/Popup';

const AddSentenceInput = ({ selectedBook, checkInputAlert, showInputAlert, changeSentenceTextarea, sentenceTextValue, showPopup, togglePopup, popupMsg, resetBookState, history, userId, userName, userPicture, submitSentence, match, modifySentence, isLoading, changeLoadingStatus, toggleModifyButton}) => {
  const { bookImage, bookTitle, author, publisher } = selectedBook

  const handleTextareaSubmit = (event) => {
    event.preventDefault();
    // Textarea를 체크해서 내용을 입력했다면 업데이트 
    if (sentenceTextValue.trim()) {
      // 글수정 버튼 숨김 
      toggleModifyButton(false);
      // 알림 숨김
      checkInputAlert(false);
      const user = {userId, userName, userPicture};
      
      // 스피너 보여주기
      changeLoadingStatus(true);

      // 글을 등록하는 것인지 수정하는 것인지 path로 구분하여 dispatch
      match.path === '/add' 
        ? submitSentence({ user, selectedBook, sentenceTextValue }) 
        : modifySentence({ sentenceId: match.params.id ,sentenceTextValue});

      // 업데이트가 끝나면 메인으로 이동
      if(!isLoading) {
        setTimeout(() => {
          resetBookState();
          history.push('/');
        }, 1000);
      }
    } else {
      // 내용을 입력하지 않았다면 알림 표시
      checkInputAlert(true);
    }
  }
  const alertPrint = showInputAlert ? (<p className="alert">문장을 입력해주세요.</p>) : '';
  const popupPrint = showPopup ? <Popup popupMsg={popupMsg} togglePopup={togglePopup} target="book" resetBookState={resetBookState} history={history} toggleModifyButton={toggleModifyButton} /> : '';
  return ( 
    <div className="add-sentence-input">
      <div className="book-info">
        <img src={bookImage} alt="책표지" />
        <p className="book-title">{bookTitle}</p>
        <p>{author} | {publisher}</p>
      </div>
      <form onSubmit={(event) => { handleTextareaSubmit(event)}}>
        <textarea cols="30" rows="10" value={sentenceTextValue} onChange={(event) => { changeSentenceTextarea(event.currentTarget.value)}} />
        <div className="buttons">
          <button type="button" onClick={() => { togglePopup('취소')}}>취소</button>
          { match.path ==='/add' 
            ? <button type="submit">완료</button> 
            : <button type="submit">수정</button>
          }
        </div>
        {alertPrint}
      </form>
      {popupPrint}
    </div>
   );
}
 
export default AddSentenceInput;