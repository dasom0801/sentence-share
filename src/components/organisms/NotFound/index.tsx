'use client';

import { Button } from '@mui/material';
import { useRouter } from 'next/navigation';
import React from 'react';
import { TbError404 } from 'react-icons/tb';
import classes from './NotFound.module.scss';

type NotFoundProps = {
  title?: string;
  children?: React.ReactNode;
};

export default function NotFound({ title, children }: NotFoundProps) {
  const router = useRouter();
  const defaultTitle = '페이지를 찾을 수 없습니다.';

  return (
    <div className={classes.notFound}>
      <TbError404 />
      <p className={classes.title}>{title || defaultTitle}</p>
      {children || (
        <Button
          variant="contained"
          color="secondary"
          onClick={() => router.back()}
        >
          뒤로 가기
        </Button>
      )}
    </div>
  );
}
