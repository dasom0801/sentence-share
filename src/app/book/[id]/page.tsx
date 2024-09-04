import { Metadata } from 'next';
import { getBook, getBookSentence } from '@/lib/api';
import BookInfoSection from '@components/book/book-info-section';
import MaxWidthWrapper from '@components/common/max-width-wrapper';
import classes from './page.module.scss';
import SentenceLikeCardList from '@components/sentence/sentence-card-list';
import Pagination from '@components/common/pagination';

type BookDetailPageProps = {
  params: {
    id: string;
  };
  searchParams: { page: string };
};

export async function generateMetadata({
  params,
}: BookDetailPageProps): Promise<Metadata> {
  const book = await getBook(params.id);
  return {
    title: `${book?.title} - Sentence Share`,
    openGraph: {
      images: [book?.coverUrl],
    },
  };
}

export default async function BookDetailPage({
  params: { id },
  searchParams: { page },
}: BookDetailPageProps) {
  const bookFetch = getBook(id);
  const sentencesFetch = getBookSentence({ bookId: id, page });
  const [book, sentences] = await Promise.all([bookFetch, sentencesFetch]);
  return (
    <main>
      <BookInfoSection book={book} />
      <MaxWidthWrapper className={classes.wrapper}>
        <SentenceLikeCardList list={sentences.list} showBook={false} />
        <Pagination count={sentences.pageTotal} />
      </MaxWidthWrapper>
    </main>
  );
}
