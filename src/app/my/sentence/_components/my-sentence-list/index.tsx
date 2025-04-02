import Pagination from '@/components/common/pagination';
import SentenceCard from '@/components/sentence/sentence-card';
import { fetchAPI } from '@/lib/api/api';
import { PaginationResult, Sentence } from '@/types';
import { Suspense } from 'react';
import MySentenceCardButtons from '../my-sentence-card-buttons';
import MySentenceEmpty from '../my-sentence-empty';
import classes from './index.module.scss';

type MySentenceListProps = {
  page: string;
};

const SENTENCE_PAGE_LIMIT = 24;
export default async function ㅌㅌMySentenceList({
  page,
}: MySentenceListProps) {
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
