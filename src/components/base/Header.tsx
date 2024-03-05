/** @jsxImportSource @emotion/react */

import { Link } from 'react-router-dom';
import Logo from './Logo';
import MaxWidthWrapper from '../common/MaxWidthWrapper';
import { loginWithGoogle } from '../../lib/api';
import { useUserQuery } from '../../lib/hooks';
import HeaderMenu from './HeaderMenu';
import { css } from '@emotion/react';

const Header = () => {
  const { data: currentUser, isLoading } = useUserQuery();

  if (isLoading) {
    return <></>;
  }

  return (
    <div className='border-solid border-b border-secondary-100'>
      <MaxWidthWrapper styles={wrapperStyle}>
        <Link to={'/'}>
          <Logo />
        </Link>
        {currentUser ? (
          <HeaderMenu user={currentUser} />
        ) : (
          <button onClick={loginWithGoogle} aria-label='continue with google'>
            <img
              src='/images/google-ctn.svg'
              alt='continue with google'
              aria-hidden='true'
            />
          </button>
        )}
      </MaxWidthWrapper>
    </div>
  );
};

const wrapperStyle = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 12px;
`;
export default Header;
