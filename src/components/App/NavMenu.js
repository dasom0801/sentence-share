import React from 'react';
import { NavLink } from 'react-router-dom';

const NavMenu = () => {
  return ( 
    <div className="nav-menu">
      <ul>
        <li><NavLink to="/sentence">내가 공유한 문장</NavLink></li>
        <li><NavLink to="/likes">내가 좋아한 문장</NavLink></li>
        <li><NavLink to="/info">내 정보</NavLink></li>
      </ul>
      <button className="logout" type="button">로그아웃</button>
    </div>
   );
}
 
export default NavMenu;