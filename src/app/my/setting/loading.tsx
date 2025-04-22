import MaxWidthWrapper from '@/components/common/MaxWidthWrapper';
import Spinner from '@/components/common/Spinner';
import classes from './loading.module.scss';

export default function SettingLoading() {
  return (
    <>
      <MaxWidthWrapper className={classes.loading}>
        <Spinner />
      </MaxWidthWrapper>
    </>
  );
}
