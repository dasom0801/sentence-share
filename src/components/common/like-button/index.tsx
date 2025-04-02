'use client';

import { toggleSentenceLike } from '@/lib/api';
import { Button } from '@mui/material';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { FaHeart, FaRegHeart } from 'react-icons/fa6';
import classes from './index.module.scss';

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
  const handleClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
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
