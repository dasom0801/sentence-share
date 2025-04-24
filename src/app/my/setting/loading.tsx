import { MaxWidthWrapper, Spinner } from '@/components/atoms';
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
