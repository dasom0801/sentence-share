import { LikeButton, Pagination } from '@/components/molecules';
import { SentenceCard } from '@/components/organisms';

import MyLikeEmpty from '../MyLikeEmpty';
import classes from './MyLikeList.module.scss';
import { getUserLikes } from './api';

type MyLikeListProps = {
  page: string;
};

export default async function MyLikeList({ page }: MyLikeListProps) {
  const { data: likes } = await getUserLikes(page);
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
