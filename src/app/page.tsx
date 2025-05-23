import { MaxWidthWrapper } from '@/components/atoms';
import { Pagination } from '@/components/molecules';
import { SentenceLikeCardList } from '@/components/organisms';
import { getSortByValue, getSortOrderValue } from '@/utils';

import { getSentences } from './(main)/api';
import { SortButtons } from './(main)/components';
import classes from './page.module.scss';

type MainPageProps = {
  searchParams: { [key: string]: string };
};

export default async function MainPage({ searchParams }: MainPageProps) {
  const _searchParams = new URLSearchParams(searchParams);
  const sortBy = getSortByValue(_searchParams.get('sortBy'));
  const sortOrder = getSortOrderValue(_searchParams.get('sortOrder'));

  const {
    data: { list, totalPages },
  } = await getSentences({
    page: searchParams.page,
    sortBy,
    sortOrder,
  });

  return (
    <main>
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
