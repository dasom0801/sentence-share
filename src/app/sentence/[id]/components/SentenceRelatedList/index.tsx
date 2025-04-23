import { getBookSentence } from '@/lib/api';
import type { Book, Sentence } from '@/types';
import SentenceTextCardList from '../SentenceTextCardList';
import classes from './SentenceRelatedList.module.scss';

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

  // 현재 화면의 문장은 제거한 목록을 만들어준다.
  const excludeCurrentSentenceList: Sentence[] | undefined = sentences.list
    .filter(({ _id }) => sentenceId !== _id)
    .slice(0, RELATED_LIST_LIMIT);

  if (excludeCurrentSentenceList?.length) {
    return (
      <>
        <h3 className={classes.title}>'{book.title}' 속의 문장들</h3>
        <SentenceTextCardList sentences={excludeCurrentSentenceList} />
      </>
    );
  }

  // list가 없으면 화면에 표시하지 않는다.
  return null;
}
