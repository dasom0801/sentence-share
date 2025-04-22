import MaxWidthWrapper from '@/components/common/MaxWidthWrapper';
import SentenceListSkeleton from '@/components/sentence/SentenceListSkeleton';
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
