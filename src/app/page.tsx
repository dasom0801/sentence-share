import MaxWidthWrapper from '@/components/common/MaxWidthWrapper';
import Pagination from '@/components/common/Pagination';
import SortButtons from '@/components/common/SortButtons';
import SentenceLikeCardList from '@/components/sentence/SentenceLikeCardList';
import { getSentences } from '@/lib/api';
import { getSortByValue, getSortOrderValue } from '@/lib/utils';
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
