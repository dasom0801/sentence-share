'use client';

import { Button } from '@mui/material';

import { useState } from 'react';
import toast from 'react-hot-toast';
import { FaHeart, FaRegHeart } from 'react-icons/fa6';

import { useUserStore } from '@/store/user';
import classes from './LikeButton.module.scss';
import { toggleSentenceLike } from './api';

type LikeButtonProps = {
  isLiked: boolean;
  id: string;
  color?:
    | 'inherit'
    | 'primary'
    | 'secondary'
    | 'success'
    | 'error'
    | 'info'
    | 'warning';
  size?: 'small' | 'medium' | 'large';
};

export default function LikeButton({
  id,
  isLiked: initialLiked,
  size = 'large',
  color = 'secondary',
}: LikeButtonProps) {
  const [isLiked, setIsLiked] = useState(initialLiked);
  const { isLogin } = useUserStore.getState();
  const handleClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();

    // 로그인하지 않은 경우 요청을 보내지 않는다.
    if (!isLogin) {
      toast('로그인 후에 이용해주세요.');
      return;
    }

    try {
      await toggleSentenceLike(id, isLiked);
      setIsLiked(!isLiked);
    } catch (e) {
      console.log(e);
      toast('문제가 발생했습니다. 잠시 후 다시 시도 해주세요.');
    }
  };

  return (
    <Button
      className={classes.button}
      size={size}
      color={color}
      fullWidth={true}
      onClick={handleClick}
      type="button"
    >
      <span>좋아요</span>
      {isLiked ? <FaHeart /> : <FaRegHeart />}
    </Button>
  );
}
