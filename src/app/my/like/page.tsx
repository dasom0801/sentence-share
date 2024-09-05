import { Metadata } from 'next';
import { Suspense } from 'react';
import { getUser } from '@/lib/api';
import MyLikeList from './_components/my-like-list';
import classes from './page.module.scss';
import SentenceListSkeleton from '@components/sentence/sentence-list-skeleton';
import MaxWidthWrapper from '@components/common/max-width-wrapper';

export const metadata: Metadata = {
  title: '내가 좋아한 문장 - Sentence Share',
};

type MyLikePageProps = {
  searchParams: { page: string };
};

export default async function MyLikePage({
  searchParams: { page },
}: MyLikePageProps) {
  const currentUser = await getUser();

  return (
    <main className={classes.main}>
      <MaxWidthWrapper>
        <Suspense fallback={<SentenceListSkeleton />}>
          {/* @ts-expect-error Async Server Component */}
          <MyLikeList userId={currentUser._id} page={page} />
        </Suspense>
      </MaxWidthWrapper>
    </main>
  );
}
