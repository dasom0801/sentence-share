import { getUserSentence } from '@/lib/api';
import Pagination from '@components/common/pagination';
import SentenceCard from '@components/sentence/sentence-card';
import MySentenceCardButtons from '../my-sentence-card-buttons';
import MySentenceEmpty from '../my-sentence-empty';
import classes from './index.module.scss';
import { Suspense } from 'react';

type MySentenceListProps = {
  userId: string;
  page: string;
};

const SENTENCE_PAGE_LIMIT = 24;
export default async function MySentenceList({
  userId,
  page,
}: MySentenceListProps) {
  const sentences = await getUserSentence({
    userId,
    page,
    limit: SENTENCE_PAGE_LIMIT,
  });
  return (
    <>
      <h1 className={classes.title}>
        내가 공유한 문장 {!!sentences?.total && `(${sentences?.total})`}
      </h1>
      {!!sentences?.total ? (
        <>
          <ul className="grid-container">
            {sentences?.list.map((sentence) => (
              <li key={sentence._id}>
                <SentenceCard sentence={sentence}>
                  <MySentenceCardButtons sentenceId={sentence._id} />
                </SentenceCard>
              </li>
            ))}
          </ul>
          <Suspense fallback={null}>
            <Pagination count={sentences.pageTotal} />
          </Suspense>
        </>
      ) : (
        <MySentenceEmpty />
      )}
    </>
  );
}
