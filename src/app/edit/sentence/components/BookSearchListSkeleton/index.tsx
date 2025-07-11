import BookListItemSkeleton from '../BookListItemSkeleton';
import classes from './BookSearchListSkeleton.module.scss';

type BookSearchListSkeletonProps = {
  length?: number;
};

export default function BookSearchListSkeleton({
  length = 5,
}: BookSearchListSkeletonProps) {
  return (
    <ul className={classes.list}>
      {Array.from({ length }, (_, index) => (
        <li key={index}>
          <BookListItemSkeleton />
        </li>
      ))}
    </ul>
  );
}
