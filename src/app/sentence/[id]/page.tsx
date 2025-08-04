import { getSentence } from '@/api/sentence';
import { MaxWidthWrapper } from '@/components/atoms';
import { UserInfo } from '@/components/molecules';
import { BookInfoSection } from '@/components/organisms';

import { Suspense } from 'react';

import { ApiError } from '@/utils/error';
import { notFound } from 'next/navigation';
import { SentenceRelatedList } from './components';
import classes from './page.module.scss';

type SentenceDetailProps = {
  params: {
    id: string;
  };
};

export default async function SentenceDetailPage({
  params: { id },
}: SentenceDetailProps) {
  try {
    if (!id || typeof id !== 'string' || id.trim() === '') {
      notFound();
    }

    const { data: sentence } = await getSentence({ sentenceId: id });

    return (
      <main>
        <BookInfoSection book={sentence.book} />
        <MaxWidthWrapper className={classes.wrapper}>
          <p>{sentence.content}</p>
          <UserInfo className={classes.userInfo} user={sentence.author} />
          {/* 관련 문장이 없을 수도 있기 때문에 fallback 표시하지 않음 */}
          <Suspense fallback={null}>
            <SentenceRelatedList
              sentenceId={sentence._id}
              book={sentence.book}
            />
          </Suspense>
        </MaxWidthWrapper>
      </main>
    );
  } catch (error) {
    if (error instanceof ApiError) {
      if (error.status === 404) {
        notFound();
      }
    }
    throw error;
  }
}
