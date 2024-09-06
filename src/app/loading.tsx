import classes from './page.module.scss';
import SortButtons from '@components/common/SortButtons';
import SentenceListSkeleton from '@components/sentence/sentence-list-skeleton';
import MaxWidthWrapper from '@components/common/max-width-wrapper';

export default function MainLoading() {
  return (
    <main>
      <MaxWidthWrapper>
        <div className={classes.buttons}>
          <SortButtons disabled={true} />
        </div>
        <SentenceListSkeleton />
      </MaxWidthWrapper>
    </main>
  );
}
