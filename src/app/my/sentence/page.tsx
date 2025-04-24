import { MaxWidthWrapper } from '@/components/atoms';
import { SentenceListSkeleton } from '@/components/organisms';
import { Metadata } from 'next';
import { Suspense } from 'react';
import { MySentenceList } from './components';
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
          {/* @ts-expect-error Server Component */}
          <MySentenceList page={page} />
        </Suspense>
      </MaxWidthWrapper>
    </main>
  );
}
