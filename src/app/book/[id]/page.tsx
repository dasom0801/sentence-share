import { getBook, getBookSentence } from '@/lib/api';
import BookInfoSection from '@components/book/book-info-section';
import MaxWidthWrapper from '@components/common/max-width-wrapper';
import Pagination from '@components/common/pagination';
import { Metadata } from 'next';
import SentenceLikeCardList from 'src/components/sentence/sentence-like-card-list';
import classes from './page.module.scss';

type BookDetailPageProps = {
  params: {
    id: string;
  };
  searchParams: { page: string };
};

export async function generateMetadata({
  params,
}: BookDetailPageProps): Promise<Metadata> {
  const { data: book } = await getBook(params.id);
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
  const [{ data: book }, { data: sentences }] = await Promise.all([
    bookFetch,
    sentencesFetch,
  ]);
  return (
    <main>
      <BookInfoSection book={book} />
      <MaxWidthWrapper className={classes.wrapper}>
        <SentenceLikeCardList list={sentences.list} showBook={false} />
        <Pagination count={sentences.totalPages} />
      </MaxWidthWrapper>
    </main>
  );
}
