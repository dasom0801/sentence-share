import SentenceListSkeleton from '@components/sentence/sentence-list-skeleton';
import MaxWidthWrapper from '@components/common/max-width-wrapper';
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
