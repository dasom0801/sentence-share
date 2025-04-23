import { LikeButton, Pagination } from '@/components/molecules';
import { SentenceCard } from '@/components/organisms';
import { fetchAPI } from '@/lib/api/api';
import { PaginationResult, Sentence } from '@/types';
import MyLikeEmpty from '../MyLikeEmpty';
import classes from './MyLikeList.module.scss';

type MyLikeListProps = {
  page: string;
};

const SENTENCE_PAGE_LIMIT = 24;
export default async function MyLikeList({ page }: MyLikeListProps) {
  const { data: likes } = await fetchAPI<PaginationResult<Sentence>>(
    `/users/me/likes?page=${page}&limit=${SENTENCE_PAGE_LIMIT}`,
    { cache: 'no-store' },
  );

  return (
    <>
      <h1 className={classes.title}>
        내가 좋아한 문장 {likes?.total && `(${likes?.total})`}
      </h1>
      {!!likes?.total ? (
        <>
          <ul className="grid-container">
            {likes?.list.map((sentence) => (
              <li key={sentence._id}>
                <SentenceCard sentence={sentence}>
                  <LikeButton id={sentence._id} isLiked={sentence.isLiked} />
                </SentenceCard>
              </li>
            ))}
          </ul>
          <Pagination count={likes?.totalPages} />
        </>
      ) : (
        <MyLikeEmpty />
      )}
    </>
  );
}
