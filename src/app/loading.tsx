import { MaxWidthWrapper } from '@/components/atoms';
import { SentenceListSkeleton } from '@/components/organisms';
import classes from './loading.module.scss';

export default function MainLoading() {
  return (
    <main>
      <MaxWidthWrapper>
        <div className={classes.buttons}></div>
        <SentenceListSkeleton />
      </MaxWidthWrapper>
    </main>
  );
}
