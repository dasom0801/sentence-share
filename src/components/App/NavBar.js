import React from 'react';
import { NavLink } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

import NavMenu from './NavMenu';
import '../../styles/components/Nav.scss'

const NavBar = ({ changeLoginStatus, history, toggleMenu, isMenuOpen, userName, userPicture}) => {
  return ( 
    <div className="top-bar">
      <div className="default">
        <button type="button" className="menu-button close">
          <FontAwesomeIcon className="google-icon" icon={faBars} aria-label="메뉴" onClick={() => { toggleMenu()}} />
        </button>
        <NavLink to="/">Sentence Share</NavLink>
      </div>
      <NavMenu changeLoginStatus={changeLoginStatus} history={history} isMenuOpen={isMenuOpen} userName={userName} userPicture={userPicture} toggleMenu={toggleMenu} />
    </div>
   );
}
 
export default NavBar;