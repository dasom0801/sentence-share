import { MaxWidthWrapper } from '@/components/atoms';
import { UserInfo } from '@/components/molecules';
import { BookInfoSection } from '@/components/organisms';
import { getSentence } from '@/lib/api';
import { Suspense } from 'react';
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
  const { data: sentence } = await getSentence({ sentenceId: id });

  return (
    <main>
      <BookInfoSection book={sentence.book} />
      <MaxWidthWrapper className={classes.wrapper}>
        <p>{sentence.content}</p>
        <UserInfo className={classes.userInfo} user={sentence.author} />
        {/* 관련 문장이 없을 수도 있기 때문에 fallback 표시하지 않음 */}
        <Suspense fallback={<></>}>
          {/* @ts-expect-error Server Component */}
          <SentenceRelatedList sentenceId={sentence._id} book={sentence.book} />
        </Suspense>
      </MaxWidthWrapper>
    </main>
  );
}
