import React from 'react';
import Popup from '../App/Popup';

const UserInfo = ({ userId, email, picture, nameInput, changeNameInput, changeName, history, userDelete, setChangedName, changeLoadingStatus, showPopup, popupMsg, togglePopup, toggleModifyButton, match, handleImageChange }) => {
  const handleNameChange = () => {
    changeLoadingStatus(true); // 스피너 표시
    setChangedName({userId, nameInput})
    changeName(nameInput);
  }
  return ( 
    <div className="user-info">
      <p className="page-title">내 정보</p>
      {showPopup && <Popup popupMsg={popupMsg} togglePopup={togglePopup} target="userInfo" history={history} toggleModifyButton={toggleModifyButton} match={match} userDelete={userDelete} userId={userId} />}
      <table className="info-table">
        <tbody>
          <tr>
            <td className="label"></td>
            <td className="picture" colSpan="2">  
              <label htmlFor="file-input">
                <img src={picture} alt="사용자 프로필 이미지" />
              </label>
              <input id="file-input" type="file" accept="image/jpeg, image/png" 
                onChange={(event) => { 
                  changeLoadingStatus(true);
                  handleImageChange({ file: event.currentTarget.files[0], userId});
                }} />
              </td>
          </tr>
          <tr>
            <td className="label">계정</td>
            <td colSpan="2">{email}</td>
          </tr>
          <tr>
            <td className="label">닉네임</td>
            <td><input type="text" value={nameInput} onChange={(event) => { changeNameInput(event.currentTarget.value) }} /></td>
            <td><button type="button" onClick={() => { handleNameChange() }}>수정</button></td>
          </tr>
        </tbody>
      </table>
      <button type="button" className="user-delete" onClick={() => togglePopup('탈퇴')}>회원 탈퇴</button>
    </div>
   );
}
 
export default UserInfo;

