import React from 'react';

const ListModifyButton = ({ toggleModifyButton, isModifyOpen, togglePopup, history, sentenceItem, selectSearchedBook, changeSentenceTextarea}) => {
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
  const selectList = isModifyOpen && (
    <ul className="select-list">
      <li className="select-item"><button onClick={() => { handleSenetenceModify()}}>수정</button></li>
      <li className="select-item"><button onClick={() => { togglePopup('삭제')}}>삭제</button></li>
    </ul>
  );
  return (
    <div className="list-modify">
      <button className="toggle-button" type="button" onClick={() => toggleModifyButton(!isModifyOpen)}>...</button>
      {selectList}
    </div>
  );
} 
export default ListModifyButton;