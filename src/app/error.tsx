'use client';

import { MdErrorOutline } from 'react-icons/md';
import { Button } from '@mui/material';
import classes from './error.module.scss';

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className={classes.error}>
      <MdErrorOutline />
      <div className={classes.title}>잠시 후 다시 시도해 주세요.</div>
      <div className={classes.description}>
        요청 사항을 처리하는데 실패했습니다.
      </div>

      <Button variant="contained" color="error" onClick={() => reset()}>
        다시 시도
      </Button>
    </div>
  );
}
