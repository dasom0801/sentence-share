import { MaxWidthWrapper, Spinner } from '@/components/atoms';
import classes from './loading.module.scss';

export default function EditLoading() {
  return (
    <>
      <MaxWidthWrapper className={classes.loading}>
        <Spinner />
      </MaxWidthWrapper>
    </>
  );
}
