/** @jsxImportSource @emotion/react */

import { Avatar, IconButton, Menu, MenuItem } from '@mui/material';
import { useState } from 'react';
import { logoutWithGoogle } from '@/lib/api';
import { useNavigate } from 'react-router-dom';
import { css } from '@emotion/react';
import { Button } from '../common';

type HeaderMenuProps = {
  user: User;
};

const HeaderMenu = ({ user }: HeaderMenuProps) => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    await logoutWithGoogle();
    handleClose();
    navigate('/');
  };

  const handleNavigate = async (path: string) => {
    handleClose();
    navigate(path);
  };

  return (
    <div css={styles}>
      <Button
        size='small'
        variant='outlined'
        onClick={() => handleNavigate('/edit/sentence')}
      >
        작성하기
      </Button>
      <IconButton
        id='menu-button'
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup='true'
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <Avatar
          alt={user.name}
          src={user.profileUrl || '/images/blank-profile.png'}
        />
      </IconButton>
      <Menu
        id='user-menu'
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
        <MenuItem onClick={() => handleNavigate('/my/sentence')}>
          내가 공유한 문장
        </MenuItem>
        <MenuItem onClick={() => handleNavigate('/my/like')}>
          내가 좋아한 문장
        </MenuItem>
        <MenuItem onClick={() => handleNavigate('/setting')}>설정</MenuItem>
        <MenuItem onClick={handleLogout}>로그아웃</MenuItem>
      </Menu>
    </div>
  );
};

const styles = css`
  display: flex;
  align-items: center;
  gap: 4px;

  button {
    height: fit-content;
  }
`;
export default HeaderMenu;
