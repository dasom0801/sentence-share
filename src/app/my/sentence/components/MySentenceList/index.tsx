import { Pagination } from '@/components/molecules';
import { SentenceCard } from '@/components/organisms';

import { Suspense } from 'react';
import MySentenceCardButtons from '../MySentenceCardButtons';
import MySentenceEmpty from '../MySentenceEmpty';
import classes from './MySentenceList.module.scss';
import { getUserSentences } from './api';

type MySentenceListProps = {
  page: string;
};

export default async function MySentenceList({ page }: MySentenceListProps) {
  const { data: sentences } = await getUserSentences(page);

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
            <Pagination count={sentences.totalPages} />
          </Suspense>
        </>
      ) : (
        <MySentenceEmpty />
      )}
    </>
  );
}
