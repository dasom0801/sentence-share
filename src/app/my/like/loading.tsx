import { MaxWidthWrapper } from '@/components/atoms';
import { SentenceListSkeleton } from '@/components/organisms';
import classes from './loading.module.scss';

export default function MyLikeLoading() {
  return (
    <main className={classes.main}>
      <MaxWidthWrapper>
        <h1 className={classes.title}>내가 좋아한 문장</h1>
        <SentenceListSkeleton />
      </MaxWidthWrapper>
    </main>
  );
}
