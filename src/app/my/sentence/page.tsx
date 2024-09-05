import { Metadata } from 'next';
import classes from './page.module.scss';
import { getUser } from '@/lib/api';
import { Suspense } from 'react';
import SentenceListSkeleton from '@components/sentence/sentence-list-skeleton';
import MySentenceList from '@/app/my/sentence/_components/my-sentence-list';
import MaxWidthWrapper from '@components/common/max-width-wrapper';

export const metadata: Metadata = {
  title: '내가 공유한 문장 - Sentence Share',
};

type MySentencePageProps = {
  searchParams: { page: string };
};

export default async function MySentencePage({
  searchParams: { page },
}: MySentencePageProps) {
  const currentUser = await getUser();
  return (
    <main className={classes.container}>
      <MaxWidthWrapper>
        <Suspense fallback={<SentenceListSkeleton />}>
          {/* @ts-expect-error Async Server Component */}
          <MySentenceList userId={currentUser._id} page={page} />
        </Suspense>
      </MaxWidthWrapper>
    </main>
  );
}
