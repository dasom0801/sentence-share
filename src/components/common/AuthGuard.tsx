/** @jsxImportSource @emotion/react */
import { Outlet } from 'react-router-dom';
import { css } from '@emotion/react';
import { pageTitle } from '@/styles';
import { useUserStore } from '@/store/user';

import LoginButton from './LoginButton';

const AuthGuard: React.FC = () => {
  const isLogin = useUserStore.use.isLogin();

  if (isLogin) {
    return <Outlet />;
  } else {
    return (
      <div css={styles}>
        <h1>로그인 후 이용해주세요.</h1>
        <LoginButton />
      </div>
    );
  }
};

const styles = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 300px;

  h1 {
    ${pageTitle};
  }
`;
export default AuthGuard;
