import React from 'react';
import Popup from '../App/Popup';

const UserInfo = ({ userId, email, nameInput, changeNameInput, changeName, history, userDelete, setChangedName, changeLoadingStatus, showPopup, popupMsg, togglePopup, toggleModifyButton, match,   }) => {
  const handleNameChange = () => {
    changeLoadingStatus(true); // 스피너 표시
    setChangedName({userId, nameInput})
    changeName(nameInput);
  }
  return ( 
    <div className="user-info">
      <p className="page-title">내 정보</p>
      {showPopup && <Popup popupMsg={popupMsg} togglePopup={togglePopup} target="userInfo" history={history} toggleModifyButton={toggleModifyButton} match={match} userDelete={userDelete} userId={userId} />}
      <div className="info-container">
        <p className="email"> <span>계정 </span>  {email}</p>
        <p className="name"> <span> 닉네임 </span><input type="text" value={nameInput} onChange={(event) => { changeNameInput(event.currentTarget.value)}}/></p> 
        <button type="button" onClick={() => { handleNameChange()}}>수정</button>
      </div>
      <button type="button" className="user-delete" onClick={() => togglePopup('탈퇴')}>회원 탈퇴</button>
    </div>
   );
}
 
export default UserInfo;

