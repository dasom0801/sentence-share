/** @jsxImportSource @emotion/react */
import { useParams } from 'react-router-dom';
import { css } from '@emotion/react';
import { colors } from '@mui/material';

import { useBookSentenceQuery } from '@/lib/hooks';
import { mq } from '@/styles';
import SentenceTextCardList from './SentenceTextCardList';
import { memo, useMemo } from 'react';

type SentenceRelatedContainerProps = {
  book: Book;
};

export const RELATED_LIST_LIMIT = 6;

const SentenceRelatedContainer: React.FC<SentenceRelatedContainerProps> = memo(
  function SentenceRelatedContainer({ book }) {
    const { id } = useParams();
    const { data } = useBookSentenceQuery({
      bookId: book._id,
      limit: RELATED_LIST_LIMIT + 1,
    });

    // 현재 화면의 문장은 제거한 목록을 만들어준다.
    const excludeCurrentSentenceList: Sentence[] | undefined = useMemo(
      () =>
        data?.list.filter(({ _id }) => id !== _id).slice(0, RELATED_LIST_LIMIT),
      [data, id],
    );

    if (excludeCurrentSentenceList?.length) {
      return (
        <>
          <h3 css={title}>'{book.title}' 속의 문장들</h3>
          <SentenceTextCardList sentences={excludeCurrentSentenceList} />
        </>
      );
    }

    // list가 없으면 화면에 표시하지 않는다.
    return null;
  },
);

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
