import MaxWidthWrapper from '@/components/common/MaxWidthWrapper';
import { Metadata } from 'next';
import MyLikeList from './components/MyLikeList';
import classes from './page.module.scss';

export const metadata: Metadata = {
  title: '내가 좋아한 문장 - Sentence Share',
};

type MyLikePageProps = {
  searchParams: { page: string };
};

export default async function MyLikePage({
  searchParams: { page },
}: MyLikePageProps) {
  return (
    <main className={classes.main}>
      <MaxWidthWrapper>
        {/* @ts-expect-error Server Component */}
        <MyLikeList page={page} />
      </MaxWidthWrapper>
    </main>
  );
}
