import classes from './page.module.scss';
import { getSentences } from '@/lib/api';
import SentenceLikeCardList from '@components/sentence/sentence-like-card-list';
import Pagination from '@components/common/pagination';
import MaxWidthWrapper from '@components/common/max-width-wrapper';
import { getSortByValue, getSortOrderValue } from '@/lib/utils';
import SortButtons from '@components/common/sort-buttons';

type MainPageProps = {
  searchParams: { [key: string]: string };
};

export default async function MainPage({ searchParams }: MainPageProps) {
  const _searchParams = new URLSearchParams(searchParams);
  const sortBy = getSortByValue(_searchParams.get('sortBy'));
  const sortOrder = getSortOrderValue(_searchParams.get('sortOrder'));
  const sentences = await getSentences({
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
        <SentenceLikeCardList list={sentences.list} />
        <Pagination count={sentences.pageTotal} />
      </MaxWidthWrapper>
    </main>
  );
}
