import MaxWidthWrapper from '@/components/common/MaxWidthWrapper';
import SentenceListSkeleton from '@/components/sentence/SentenceListSkeleton';
import classes from './loading.module.scss';

export default function MySentenceLoading() {
  return (
    <main className={classes.container}>
      <MaxWidthWrapper>
        <h1 className={classes.title}>내가 공유한 문장</h1>
        <SentenceListSkeleton />
      </MaxWidthWrapper>
    </main>
  );
}
