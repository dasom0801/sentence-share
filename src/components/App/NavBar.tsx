import React from 'react';
import { NavLink } from 'react-router-dom';

import NavMenu from './NavMenu';

const NavBar = () => {
  return (
    <></>
    // <div className='top-bar'>
    //   <div className='default'>
    //     <button type='button' className='menu-button close'>
    //       <FontAwesomeIcon className="google-icon" icon={faBars} aria-label="메뉴" onClick={() => { toggleMenu()}} />
    //     </button>
    //     <NavLink to='/'>Sentence Share</NavLink>
    //   </div>
    //   <NavMenu
    //     changeLoginStatus={changeLoginStatus}
    //     history={history}
    //     isMenuOpen={isMenuOpen}
    //     userName={userName}
    //     userPicture={userPicture}
    //     toggleMenu={toggleMenu}
    //   />
    //   <div
    //     className={`nav-background ${isMenuOpen ? 'is-open' : ''}`}
    //     onClick={() => {
    //       toggleMenu();
    //     }}
    //   ></div>
    // </div>
  );
};

export default NavBar;
