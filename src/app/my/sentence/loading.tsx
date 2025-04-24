import { MaxWidthWrapper } from '@/components/atoms';
import { SentenceListSkeleton } from '@/components/organisms';
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
