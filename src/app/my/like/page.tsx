import { MaxWidthWrapper } from '@/components/atoms';
import { Metadata } from 'next';
import { getUserLikes } from './api';
import { MyLikeList } from './components';
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
  const { data } = await getUserLikes(page);
  return (
    <main className={classes.main}>
      <MaxWidthWrapper>
        <MyLikeList {...data} />
      </MaxWidthWrapper>
    </main>
  );
}
