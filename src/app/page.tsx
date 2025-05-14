import { MaxWidthWrapper } from '@/components/atoms';
import { Pagination } from '@/components/molecules';
import { SentenceLikeCardList } from '@/components/organisms';
import { getSortByValue, getSortOrderValue } from '@/utils';
import { cookies } from 'next/headers';

import { getUser } from '@/api/user';
import { getSentences } from './(main)/api';
import { SortButtons } from './(main)/components';
import UserProvider from './(main)/components/UserProvider';
import classes from './page.module.scss';

type MainPageProps = {
  searchParams: { [key: string]: string };
};

export default async function MainPage({ searchParams }: MainPageProps) {
  const _searchParams = new URLSearchParams(searchParams);
  const sortBy = getSortByValue(_searchParams.get('sortBy'));
  const sortOrder = getSortOrderValue(_searchParams.get('sortOrder'));

  const cookieStore = cookies();
  const token = cookieStore.get('access_token');
  let user = null;
  if (token?.value) {
    try {
      const { data } = await getUser();
      user = data;
    } catch (error) {
      console.error('사용자 정보 가져오기 실패:', error);
    }
  }

  const {
    data: { list, totalPages },
  } = await getSentences({
    page: searchParams.page,
    sortBy,
    sortOrder,
  });

  return (
    <main>
      <UserProvider user={user} />
      <MaxWidthWrapper>
        <div className={classes.buttons}>
          <SortButtons />
        </div>
        <SentenceLikeCardList list={list} />
        <Pagination count={totalPages} />
      </MaxWidthWrapper>
    </main>
  );
}
