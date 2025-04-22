import { Skeleton } from '@mui/material';
import classes from './BookListItemSkeleton.module.scss';

export default function BookListItemSkeleton() {
  return (
    <div className={classes.skeleton}>
      <Skeleton variant="rounded" width={82} height={120} />
      <div>
        <Skeleton
          variant="text"
          width="100%"
          sx={{ fontSize: '18px', marginBottom: '8px' }}
        />
        <Skeleton variant="text" width="50%" sx={{ fontSize: '14px' }} />
        <Skeleton variant="text" width="60%" sx={{ fontSize: '14px' }} />
      </div>
    </div>
  );
}
