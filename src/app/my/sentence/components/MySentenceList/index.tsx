import { Pagination } from '@/components/molecules';
import { SentenceCard } from '@/components/organisms';
import { fetchAPI } from '@/lib/api/api';
import { PaginationResult, Sentence } from '@/types';
import { Suspense } from 'react';
import MySentenceCardButtons from '../MySentenceCardButtons';
import MySentenceEmpty from '../MySentenceEmpty';
import classes from './MySentenceList.module.scss';

type MySentenceListProps = {
  page: string;
};

const SENTENCE_PAGE_LIMIT = 24;
export default async function MySentenceList({ page }: MySentenceListProps) {
  const { data: sentences } = await fetchAPI<PaginationResult<Sentence>>(
    `/users/me/sentences?page=${page || 1}&limit=${SENTENCE_PAGE_LIMIT}}`,
    {
      cache: 'no-store',
    },
  );

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
