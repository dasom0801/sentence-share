/** @jsxImportSource @emotion/react */
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { css } from '@emotion/react';

import { useBookSentenceQuery } from '@/lib/hooks';
import { SentenceTextCardList } from '@/components';
import { pageTitle } from '@/styles';
import { colors } from '@mui/material';

type SentenceDetailRelatedList = {
  book: Book;
};

const SentenceRealtedContainer = ({ book }: SentenceDetailRelatedList) => {
  const { id } = useParams();
  const { data, isLoading } = useBookSentenceQuery({ id: book._id, limit: 7 });
  const excludeCurrentSenteneList: Sentence[] | undefined = data?.list
    .filter(({ _id }) => id !== _id)
    .slice(0, 6);

  useEffect(() => {});

  if (excludeCurrentSenteneList?.length) {
    return (
      <>
        <h3 css={title}>'{book.title}' 속의 문장들</h3>
        <SentenceTextCardList sentences={excludeCurrentSenteneList} />
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

  @media (min-width: 768px) {
    font-size: 20px;
  }
`;

export default SentenceRealtedContainer;
