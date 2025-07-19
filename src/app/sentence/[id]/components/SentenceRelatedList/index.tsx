import { getBookSentence } from '@/api/book';
import type { Book } from '@/types';

import SentenceRelatedListUI from '../SentenceRelatedListUI';

type SentenceRelatedListProps = {
  sentenceId: string;
  book: Book;
};

export const RELATED_LIST_LIMIT = 6;
export default async function SentenceRelatedList({
  sentenceId,
  book,
}: SentenceRelatedListProps) {
  const { data: sentences } = await getBookSentence({
    bookId: book._id,
    limit: RELATED_LIST_LIMIT + 1,
  });

  return (
    <SentenceRelatedListUI
      excludeSentenceId={sentenceId}
      sentences={sentences.list}
      bookTitle={book.title}
    />
  );
}
