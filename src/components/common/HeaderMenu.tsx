/** @jsxImportSource @emotion/react */

import { memo, useState } from 'react';
import { Avatar, Button, IconButton, Menu, MenuItem } from '@mui/material';
import {
  Link,
  useNavigate,
  useSearchParams,
  useLocation,
  createSearchParams,
} from 'react-router-dom';
import { css } from '@emotion/react';
import { useUserStore } from '@/store/user';
import { useLogout, useUserQuery } from '@/lib/hooks';
import LoginButton from './LoginButton';
import blankProfile from '../../../public/images/blank-profile.png';

export const navigateMenus: { label: string; path: string }[] = [
  { label: '내가 공유한 문장', path: '/my/sentence' },
  { label: '내가 좋아한 문장', path: '/my/like' },
  { label: '설정', path: '/my/setting' },
];

const HeaderMenu: React.FC = memo(function HeaderMenu() {
  const navigate = useNavigate();
  const { mutate: logout } = useLogout();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const user = useUserStore.use.user();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  useUserQuery();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    logout();
    handleClose();
    goToMain();
  };

  const goToMain = () => {
    const authRoutes = ['edit', 'my'];
    if (location.pathname === '/') {
      navigate({
        pathname: '/',
        search: `${createSearchParams(searchParams)}`,
      });
      return;
    }

    if (authRoutes.includes(location.pathname.split('/')[1])) {
      navigate('/');
      return;
    }
  };

  const handleNavigate = async (path: string) => {
    handleClose();
    navigate(path);
  };

  return user ? (
    <div css={styles}>
      <Button
        component={Link}
        size="small"
        variant="outlined"
        to="/edit/sentence"
      >
        작성하기
      </Button>
      <IconButton
        id="menu-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <Avatar alt={user.name} src={user.profileUrl || blankProfile.src} />
      </IconButton>
      <Menu
        id="user-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        MenuListProps={{
          'aria-labelledby': 'menu-button',
        }}
      >
        {navigateMenus.map((menu) => (
          <MenuItem key={menu.path} onClick={() => handleNavigate(menu.path)}>
            {menu.label}
          </MenuItem>
        ))}

        <MenuItem onClick={handleLogout}>로그아웃</MenuItem>
      </Menu>
    </div>
  ) : (
    <LoginButton />
  );
});

const styles = css`
  display: flex;
  align-items: center;
  gap: 4px;

  button {
    height: fit-content;
  }
`;
export default HeaderMenu;
