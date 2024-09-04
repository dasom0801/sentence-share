import { Suspense } from 'react';
import { getSentence } from '@/lib/api';
import BookInfoSection from '@components/book/book-info-section';
import MaxWidthWrapper from '@components/common/max-width-wrapper';
import UserInfo from '@components/common/user-info';
import SentenceRelatedList from '@components/sentence/sentence-related-list';
import classes from './page.module.scss';

type SentenceDetailProps = {
  params: {
    id: string;
  };
};

export default async function SentenceDetailPage({
  params: { id },
}: SentenceDetailProps) {
  const sentence = await getSentence({ sentenceId: id });

  return (
    <main>
      <BookInfoSection book={sentence.book} />
      <MaxWidthWrapper className={classes.wrapper}>
        <p>{sentence.content}</p>
        <UserInfo className={classes.userInfo} user={sentence.author} />
        {/* 관련 문장이 없을 수도 있기 때문에 fallback 표시하지 않음 */}
        <Suspense fallback={<></>}>
          {/* @ts-expect-error Async Server Component */}
          <SentenceRelatedList sentenceId={sentence._id} book={sentence.book} />
        </Suspense>
      </MaxWidthWrapper>
    </main>
  );
}
