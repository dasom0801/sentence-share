'use client';

import { Button } from '@mui/material';

import { FaHeart, FaRegHeart } from 'react-icons/fa6';

import classes from './LikeButton.module.scss';
import { useLike } from './hooks';

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
  const { isLiked, isLoading, handleLikeToggle } = useLike({
    id,
    initialLiked,
  });
  return (
    <Button
      className={classes.button}
      size={size}
      color={color}
      fullWidth={true}
      onClick={handleLikeToggle}
      type="button"
      disabled={isLoading}
      aria-pressed={isLiked}
    >
      <span className={classes.srOnly}>
        {isLiked ? '좋아요 취소' : '좋아요'}
      </span>
      {isLiked ? <FaHeart /> : <FaRegHeart />}
    </Button>
  );
}
