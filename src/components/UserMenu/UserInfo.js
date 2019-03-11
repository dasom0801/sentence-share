import React from 'react';

const UserInfo = () => {
  return ( 
    <div className="user-info">
      <p>내 정보</p>
      <p>계정</p>
      <p>닉네임</p> 
      <button type="button">수정</button>
      <button type="button">회원 탈퇴</button>
    </div>
   );
}
 
export default UserInfo;