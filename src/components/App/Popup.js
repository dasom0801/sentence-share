import React from 'react';

const Popup = ({ popupMsg, togglePopup, target, resetBookState, history, toggleModifyButton, match, deleteListItem, id, userId}) => {
  const handlePopupSubmit= () =>{
    togglePopup('');
    if(target === 'book') {
      resetBookState();
      history.push('/');
    } else if (target === 'list') {
      const {path} = match;
      const filter = path.indexOf('detail') > -1 && path.indexOf('/book') > -1 ? 'book' : 'user';
      // DB에 데이터를 요청한다음 store의 list에 넣을 때 필요한 값
      const getListDB = {
        userId,
        filter,
        id: match.params.id,
        orderBy: 'updateDate', 
      }
      // 리스트 아이템 삭제할 때 수정 버튼 닫기
      toggleModifyButton(false);
      deleteListItem({path, sentenceId: id, getListDB})
    }
  }
  return ( 
    <div className="popup">
      <div className="message-box">
        <p>{popupMsg}하시겠습니까?</p>
        <button className="cancel" onClick={() => { togglePopup(popupMsg)}}>아니오</button>
        <button className="submit"onClick={() => { handlePopupSubmit()}} >네</button>
      </div>
    </div>
   );
}
 
export default Popup;