import type { Sentence } from '@/types';

import SentenceTextCardList from '../SentenceTextCardList';
import classes from './SentenceRelatedListUI.module.scss';
import { excludeSentenceFromList } from './utils';

type SentenceRelatedListUIProps = {
  excludeSentenceId: string;
  sentences: Sentence[];
  bookTitle: string;
};

export default function SentenceRelatedListUI({
  excludeSentenceId,
  sentences,
  bookTitle,
}: SentenceRelatedListUIProps) {
  // 현재 화면의 문장은 제거한 목록을 만들어준다.
  const excludeCurrentSentenceList: Sentence[] | undefined =
    excludeSentenceFromList(sentences, excludeSentenceId);

  if (excludeCurrentSentenceList?.length) {
    return (
      <>
        <h3 className={classes.title}>'{bookTitle}' 속의 문장들</h3>
        <SentenceTextCardList sentences={excludeCurrentSentenceList} />
      </>
    );
  }

  // list가 없으면 화면에 표시하지 않는다.
  return null;
}
