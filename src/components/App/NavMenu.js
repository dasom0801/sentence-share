import React from 'react';
import { NavLink } from 'react-router-dom';
import { auth } from '../../modules/firebaseConfig';

const NavMenu = ({ changeLoginStatus, history, getUserLikesListDB, userId }) => {
  const handleLogout = () => {
    // 사용자 로그아웃
    // localStorage의 정보를 삭제하고 state의 로그인 상태를 변경한다.
    auth.signOut().then(() => {
      window.localStorage.removeItem('user');
      changeLoginStatus(false, '');
      history.push('/');
    })
  }
  return ( 
    <div className="nav-menu">
      <ul>
        <li><NavLink to="/sentence">내가 공유한 문장</NavLink></li>
        <li><NavLink to="/likes" onClick={() => { getUserLikesListDB({userId, orderBy: "updateDate"})}}>내가 좋아한 문장</NavLink></li>
        <li><NavLink to="/info">내 정보</NavLink></li>
      </ul>
      <button className="logout" type="button" onClick={() => {handleLogout()}}>로그아웃</button>
    </div>
   );
}
 
export default NavMenu;