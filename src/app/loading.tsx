import { MaxWidthWrapper, Spinner } from '@/components/atoms';
import classes from './loading.module.scss';

export default function MainLoading() {
  return (
    <main>
      <MaxWidthWrapper className={classes.wrapper}>
        <Spinner />
      </MaxWidthWrapper>
    </main>
  );
}
