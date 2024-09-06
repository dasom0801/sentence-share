import MaxWidthWrapper from '@components/common/max-width-wrapper';
import SentenceListSkeleton from '@components/sentence/sentence-list-skeleton';
import classes from './page.module.scss';

export default function MyLikeLoading() {
  return (
    <main className={classes.main}>
      <MaxWidthWrapper>
        <SentenceListSkeleton />
      </MaxWidthWrapper>
    </main>
  );
}
