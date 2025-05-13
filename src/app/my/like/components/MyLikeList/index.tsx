import { Pagination } from '@/components/molecules';
import { SentenceLikeCardList } from '@/components/organisms';

import type { Sentence } from '@/types';
import MyLikeEmpty from '../MyLikeEmpty';
import classes from './MyLikeList.module.scss';

type MyLikeListProps = {
  list: Sentence[];
  totalPages: number;
  total: number;
};

export default async function MyLikeList({
  list,
  totalPages,
  total,
}: MyLikeListProps) {
  return (
    <>
      <h1 className={classes.title}>
        내가 좋아한 문장 {!!total && `(${total})`}
      </h1>
      {!!total ? (
        <>
          <SentenceLikeCardList list={list} />
          <Pagination count={totalPages} />
        </>
      ) : (
        <MyLikeEmpty />
      )}
    </>
  );
}
