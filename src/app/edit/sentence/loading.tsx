import MaxWidthWrapper from '@components/common/max-width-wrapper';
import Spinner from '@components/common/spinner';
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
