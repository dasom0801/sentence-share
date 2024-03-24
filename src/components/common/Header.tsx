/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { colors } from '@mui/material';
import { Link } from 'react-router-dom';

import { useUserStore } from '@/store/user';
import { useUserQuery } from '@/lib/hooks';
import HeaderMenu from './HeaderMenu';
import Logo from './Logo';
import MaxWidthWrapper from './MaxWidthWrapper';
import LoginButton from './LoginButton';

const Header = () => {
  const user = useUserStore.use.user();
  useUserQuery();

  return (
    <div css={headerStyle}>
      <MaxWidthWrapper styles={wrapperStyle}>
        <Link to='/'>
          <Logo />
        </Link>
        {user ? <HeaderMenu user={user} /> : <LoginButton />}
      </MaxWidthWrapper>
    </div>
  );
};

const headerStyle = css`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;

  display: flex;
  align-items: center;
  width: 100%;
  height: 56px;
  border-bottom: 1px solid ${colors.blueGrey[100]};
  background-color: white;
`;

const wrapperStyle = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
export default Header;
