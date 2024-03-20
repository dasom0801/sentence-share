/** @jsxImportSource @emotion/react */
import { useParams } from 'react-router-dom';
import { css } from '@emotion/react';
import { colors } from '@mui/material';

import { useBookSentenceQuery } from '@/lib/hooks';
import { mq } from '@/styles';
import SentenceTextCardList from './SentenceTextCardList';

type SentenceDetailRelatedList = {
  book: Book;
};

export const RELATED_LIST_LIMIT = 6;

const SentenceRelatedContainer = ({ book }: SentenceDetailRelatedList) => {
  const { id } = useParams();
  const { data } = useBookSentenceQuery({ id: book._id, limit: 7 });
  const excludeCurrentSentenceList: Sentence[] | undefined = data?.list
    .filter(({ _id }) => id !== _id)
    .slice(0, RELATED_LIST_LIMIT);

  if (excludeCurrentSentenceList?.length) {
    return (
      <>
        <h3 css={title}>'{book.title}' 속의 문장들</h3>
        <SentenceTextCardList sentences={excludeCurrentSentenceList} />
      </>
    );
  }

  // list가 없으면 화면에 표시하지 않는다.
  return <></>;
};

const title = css`
  margin: 0 0 16px 0;
  color: ${colors.blueGrey[900]};
  font-size: 18px;
  font-weight: 500;

  ${mq.md} {
    font-size: 20px;
  }
`;

export default SentenceRelatedContainer;
