import React from 'react';
import { firestore, auth} from '../../modules/firebaseConfig';

const UserInfo = ({ id, email, nameInput, changeNameInput, changeName, changeLoginStatus, setUserInfo, setUserId, history}) => {
  const handleInputChange = (event) => {
    const {value} = event.currentTarget;
    changeNameInput(value);
  }

  const handleNameChange = () => {
    firestore.collection('users').doc(id).set({name: nameInput}, {merge: true});
    changeName(nameInput);
  }
  const handleUserDelete = () => {
    // firebase auth에서 회원 탈퇴 후 DB, store, localStorage에서도 삭제
    auth.currentUser.delete().then(() => {
      firestore.collection('users').doc(id).delete();
      changeLoginStatus(false);
      setUserInfo({name: '', email: '', picture: ''});
      setUserId('');
      window.localStorage.removeItem('user');
      history.push('/');
    })
  }
  return ( 
    <div className="user-info">
      <p>내 정보</p>
      <p>계정 {email}</p>
      <p>닉네임 <input type="text" value={nameInput} onChange={(event) => { handleInputChange(event)}}/></p> 
      <button type="button" onClick={() => { handleNameChange()}}>수정</button>
      <button type="button" onClick={() => handleUserDelete()}>회원 탈퇴</button>
    </div>
   );
}
 
export default UserInfo;