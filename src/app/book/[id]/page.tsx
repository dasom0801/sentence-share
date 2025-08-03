import { getBookSentence } from '@/api/book';
import { MaxWidthWrapper } from '@/components/atoms';
import { Pagination } from '@/components/molecules';
import { BookInfoSection, SentenceLikeCardList } from '@/components/organisms';

import { Metadata } from 'next';

import { ApiError } from '@/utils/error';
import { notFound } from 'next/navigation';
import { getBook } from './api';
import classes from './page.module.scss';

type BookDetailPageProps = {
  params: {
    id: string;
  };
  searchParams: { page: string };
};

export async function generateMetadata({
  params,
}: BookDetailPageProps): Promise<Metadata | null> {
  try {
    const { data: book } = await getBook(params.id);
    return {
      title: `${book?.title} - Sentence Share`,
      openGraph: {
        images: [book?.coverUrl],
      },
    };
  } catch (error) {
    return null;
  }
}

export default async function BookDetailPage({
  params: { id },
  searchParams: { page },
}: BookDetailPageProps) {
  if (!id || typeof id !== 'string' || id.trim() === '') {
    notFound();
  }
  try {
    const bookFetch = getBook(id);
    const sentencesFetch = getBookSentence({ bookId: id, page });
    const [{ data: book }, { data: sentences }] = await Promise.all([
      bookFetch,
      sentencesFetch,
    ]);

    if (!book) {
      notFound();
    }

    return (
      <main>
        <BookInfoSection book={book} />
        <MaxWidthWrapper className={classes.wrapper}>
          <SentenceLikeCardList list={sentences.list} showBook={false} />
          <Pagination count={sentences.totalPages} />
        </MaxWidthWrapper>
      </main>
    );
  } catch (error) {
    if (error instanceof ApiError) {
      if (error.status === 404) {
        notFound();
      }
    }
    throw error;
  }
}
