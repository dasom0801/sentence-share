import React from 'react';

const UserInfo = ({ userId, email, nameInput, changeNameInput, changeName, history, userDelete, setChangedName, changeLoadingStatus, isLoading}) => {
  const handleNameChange = () => {
    changeLoadingStatus(true); // 스피너 표시
    setChangedName({userId, nameInput})
    changeName(nameInput);
  }
  const handleUserDelete = () => {
    userDelete(userId);
    setTimeout(() => {
      history.push('/');  
    }, 2000);
  }
  return ( 
    <div className="user-info">
      <p>내 정보</p>
      <p>계정 {email}</p>
      <p>닉네임 <input type="text" value={nameInput} onChange={(event) => { changeNameInput(event.currentTarget.value)}}/></p> 
      <button type="button" onClick={() => { handleNameChange()}}>수정</button>
      <button type="button" onClick={() => handleUserDelete()}>회원 탈퇴</button>
    </div>
   );
}
 
export default UserInfo;