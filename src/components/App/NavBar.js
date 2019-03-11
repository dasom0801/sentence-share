import React from 'react';
import { NavLink } from 'react-router-dom';

import NavMenu from './NavMenu';

const NavBar = () => {
  return ( 
    <div className="top-bar">
      <div className="defualt">
        <button type="button" className="menu-button close">메뉴</button>
        <NavLink to="/">SentenceShare</NavLink>
        <button type="button" className="search-button close">검색</button>
      </div>
      <NavMenu />
    </div>
   );
}
 
export default NavBar;