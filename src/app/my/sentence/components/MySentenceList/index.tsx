import { Pagination } from '@/components/molecules';
import { SentenceCard } from '@/components/organisms';

import type { Sentence } from '@/types';
import MySentenceCardButtons from '../MySentenceCardButtons';
import MySentenceEmpty from '../MySentenceEmpty';
import classes from './index.module.scss';

type MySentenceListProps = {
  list: Sentence[];
  totalPages: number;
  total: number;
};

export default function MySentenceList({
  list,
  total,
  totalPages,
}: MySentenceListProps) {
  return (
    <>
      <h1 className={classes.title}>
        내가 작성한 문장 {!!total && `(${total})`}
      </h1>
      {!!total ? (
        <>
          <ul className="grid-container">
            {list.map((sentence) => (
              <li key={sentence._id}>
                <SentenceCard sentence={sentence}>
                  <MySentenceCardButtons sentenceId={sentence._id} />
                </SentenceCard>
              </li>
            ))}
          </ul>
          <Pagination count={totalPages} />
        </>
      ) : (
        <MySentenceEmpty />
      )}
    </>
  );
}
