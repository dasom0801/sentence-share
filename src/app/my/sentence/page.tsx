import { MaxWidthWrapper } from '@/components/atoms';
import { Metadata } from 'next';
import { getUserSentences } from './api';
import { MySentenceList } from './components';
import classes from './page.module.scss';

export const metadata: Metadata = {
  title: '내가 작성한 문장 - Sentence Share',
};

type MySentencePageProps = {
  searchParams: { page: string };
};

export default async function MySentencePage({
  searchParams: { page },
}: MySentencePageProps) {
  const { data } = await getUserSentences(page);
  return (
    <main className={classes.container}>
      <MaxWidthWrapper>
        <MySentenceList {...data} />
      </MaxWidthWrapper>
    </main>
  );
}
