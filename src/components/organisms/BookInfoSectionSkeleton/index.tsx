import { Skeleton } from '@mui/material';
import classes from './BookInfoSectionSkeleton.module.scss';

export default function BookInfoSectionSkeleton() {
  return (
    <div className={classes.skeleton}>
      <Skeleton className="image" variant="rounded" width={180} height={260} />
      <Skeleton
        className="title"
        variant="text"
        width="50%"
        sx={{ fontSize: '20px' }}
      />
      <Skeleton variant="text" width="25%" sx={{ fontSize: '16px' }} />
    </div>
  );
}
