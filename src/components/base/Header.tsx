/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { colors } from '@mui/material';
import { Link } from 'react-router-dom';

import { loginWithGoogle } from '@/lib/api';
import { useUserQuery } from '@/lib/hooks';
import HeaderMenu from './HeaderMenu';
import Logo from './Logo';
import MaxWidthWrapper from '../common/MaxWidthWrapper';

const Header = () => {
  const { data: currentUser, isLoading } = useUserQuery();

  if (isLoading) {
    return <></>;
  }

  return (
    <div css={headerStyle}>
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

const headerStyle = css`
  display: flex;
  align-items: center;
  min-height: 56px;
  border-bottom: 1px solid ${colors.blueGrey[100]};
`;

const wrapperStyle = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
export default Header;
