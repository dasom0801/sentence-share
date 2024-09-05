import { getUserLike } from '@/lib/api';
import classes from './index.module.scss';
import MyLikeEmpty from '@/app/my/like/_components/my-like-empty';
import Pagination from '@components/common/pagination';
import SentenceCard from '@components/sentence/sentence-card';
import LikeButton from '@components/common/like-button';

type MyLikeListProps = {
  userId: string;
  page: string;
};

export default async function MyLikeList({ userId, page }: MyLikeListProps) {
  const likes = await getUserLike({ userId, page });

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
          <Pagination count={likes?.pageTotal} />
        </>
      ) : (
        <MyLikeEmpty />
      )}
    </>
  );
}
