import React from 'react';
import Popup from '../App/Popup';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';


const ListModifyButton = ({ showPopup, userId, toggleModifyButton, isModifyOpen, togglePopup, history, sentenceItem, selectSearchedBook, changeSentenceTextarea, selectedModifyItem, popupMsg, match, deleteListItem}) => {
  const handleSenetenceModify = () => {
    const { author, bookImage, bookTitle, publisher, isbn, body} = sentenceItem;
    const selectedItemBookInfo = {
      author: [author],
      bookImage,
      bookTitle,
      publisher,
      isbn
    }
    selectSearchedBook(selectedItemBookInfo);
    changeSentenceTextarea(body);
    history.push(`/modify/${sentenceItem.id}`);
  }

  // showPopup이 true가 되면 팝업 표시. 글 삭제할 때 삭제 여부 확인
  const popupPrint = showPopup && <Popup popupMsg={popupMsg} togglePopup={togglePopup} target="list" history={history} toggleModifyButton={toggleModifyButton} match={match} deleteListItem={deleteListItem} id={selectedModifyItem} userId={userId} />

  // 선택된 아이템에서만 버튼이 표시되게한다.
  const selectList = isModifyOpen && selectedModifyItem === sentenceItem.id && (
    <ul className="select-list">
      <li className="select-item"><button onClick={() => { handleSenetenceModify()}}>수정</button></li>
      <li className="select-item"><button onClick={() => { togglePopup('삭제')}}>삭제</button></li>
    </ul>
  );
  return (
    <div className="list-modify">
      <button className="toggle-button" type="button" onClick={() => toggleModifyButton(!isModifyOpen, sentenceItem.id)}>
        <FontAwesomeIcon icon={faEllipsisH} aria-label="내 글 관리" />
      </button>
      {selectList}
      {popupPrint}
    </div>
  );
} 
export default ListModifyButton;