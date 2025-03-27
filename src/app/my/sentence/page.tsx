import MySentenceList from '@/app/my/sentence/_components/my-sentence-list';
import MaxWidthWrapper from '@components/common/max-width-wrapper';
import SentenceListSkeleton from '@components/sentence/sentence-list-skeleton';
import { Metadata } from 'next';
import { Suspense } from 'react';
import classes from './page.module.scss';

export const metadata: Metadata = {
  title: '내가 공유한 문장 - Sentence Share',
};

type MySentencePageProps = {
  searchParams: { page: string };
};

export default async function MySentencePage({
  searchParams: { page },
}: MySentencePageProps) {
  return (
    <main className={classes.container}>
      <MaxWidthWrapper>
        <Suspense fallback={<SentenceListSkeleton />}>
          <MySentenceList page={page} />
        </Suspense>
      </MaxWidthWrapper>
    </main>
  );
}
