import { Skeleton } from '@mui/material';
import classes from './SentenceCardSkeleton.module.scss';

export default function SentenceCardSkeleton() {
  return (
    <div className={classes.card}>
      <div className="backdrop">
        <div className={classes.header}>
          <Skeleton variant="circular" width={30} height={30} />
          <Skeleton variant="text" width="40%" sx={{ fontSize: '16px' }} />
        </div>

        <Skeleton sx={{ height: 200 }} variant="rectangular" />
        <div className={classes.bookInfo}>
          <Skeleton variant="text" width="90%" sx={{ fontSize: '18px' }} />
          <Skeleton variant="text" width="50%" sx={{ fontSize: '16px' }} />
        </div>
      </div>
    </div>
  );
}
