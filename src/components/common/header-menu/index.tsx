'use client';

import { memo, useState } from 'react';
import { Button, IconButton, Menu, MenuItem } from '@mui/material';
import { useUserStore } from '@/store/user';
import { useLogout, useUserQuery } from '@/lib/hooks';
import blankProfile from '../../../../public/images/blank-profile.png';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import LoginButton from '@components/common/login-button';
import classes from './index.module.scss';

export const navigateMenus: { label: string; path: string }[] = [
  { label: '내가 공유한 문장', path: '/my/sentence' },
  { label: '내가 좋아한 문장', path: '/my/like' },
  { label: '설정', path: '/my/setting' },
];

const HeaderMenu: React.FC = memo(function HeaderMenu() {
  const router = useRouter();
  const { mutate: logout } = useLogout();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const user = useUserStore.use.user();

  useUserQuery();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    logout();
    handleClose();
  };

  const handleNavigate = async (path: string) => {
    handleClose();
    router.push(path);
  };

  return user ? (
    <div className={classes.headerMenu}>
      <Button
        size="small"
        variant="outlined"
        onClick={() => handleNavigate('/edit/sentence')}
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
        <Image
          style={{ borderRadius: '50%' }}
          width={40}
          height={40}
          alt={user.name}
          src={user.profileUrl || blankProfile}
        />
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

export default HeaderMenu;
