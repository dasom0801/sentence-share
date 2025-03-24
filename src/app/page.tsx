import { getSentences } from '@/lib/api';
import { getSortByValue, getSortOrderValue } from '@/lib/utils';
import MaxWidthWrapper from '@components/common/max-width-wrapper';
import Pagination from '@components/common/pagination';
import SortButtons from '@components/common/sort-buttons';
import SentenceLikeCardList from '@components/sentence/sentence-like-card-list';
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
