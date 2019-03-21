import React from 'react';

const Popup = ({ popupMsg, togglePopup, target, resetBookState, history, toggleModifyButton, match, deleteListItem, id, userId, userDelete}) => {
  const handlePopupSubmit= () =>{
    togglePopup('');
    if(target === 'book') {
      resetBookState();
      history.push('/');
    } else if (target === 'list') {
      // 문장 삭제하기
      const {path, params} = match;
      const filter = path.indexOf('detail') > -1 && path.indexOf('/book') > -1 ? 'book' : 'user';
      const bookId = params.id;
      // DB에 데이터를 요청한다음 store의 list에 넣을 때 필요한 값
      const getListDB = {
        userId,
        bookId,
        filter,
        id,
        orderBy: 'updateDate', 
      }
      
      deleteListItem({path, sentenceId: id, getListDB})
    }  else if (target === 'userInfo') {
      // 회원 탈퇴
      userDelete(userId);
      setTimeout(() => {
        history.push('/');  
        }, 2000);
    }
    toggleModifyButton(false);
  }
  return ( 
    <div className="popup">
      <div className="message-box">
        <p>{popupMsg}하시겠습니까?</p>
        <button className="cancel" 
        onClick={() => { 
          toggleModifyButton(false);
          togglePopup(popupMsg)
        }}>
          아니오
        </button>
        <button className="submit"onClick={() => { handlePopupSubmit()}} >네</button>
      </div>
    </div>
   );
}
 
export default Popup;