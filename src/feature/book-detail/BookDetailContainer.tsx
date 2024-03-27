/** @jsxImportSource @emotion/react */

import { useParams } from 'react-router-dom';
import { Pagination } from '@mui/material';
import { css } from '@emotion/react';
import { Helmet } from 'react-helmet-async';

import { pagination } from '@/styles';
import {
  BookInfoSection,
  MaxWidthWrapper,
  SentenceLikeCardList,
} from '@/components';
import {
  useBookSentenceQuery,
  usePagination,
  useToggleSentenceLike,
} from '@/lib/hooks';
import { bookQueries } from '@/queries';
import useBookDetailQuery from './hooks/useBookDetailQuery';

const BookDetailContainer: React.FC = () => {
  const { id } = useParams();
  const { page, setPage } = usePagination();
  const {
    data: book,
    isLoading: isBookLoading,
    isError,
    error,
  } = useBookDetailQuery(id);

  const { data: sentences, isLoading: isSentenceLoading } =
    useBookSentenceQuery({ bookId: id, page });

  const { mutate } = useToggleSentenceLike({
    updateQueryKey: bookQueries.sentenceList({ bookId: id, page }).queryKey,
  });

  if (isError) {
    throw error;
  }

  return (
    <>
      <Helmet>
        <title>{`${book?.title} - ` || ''}Sentence Share</title>
      </Helmet>
      <BookInfoSection book={book} isLoading={isBookLoading} />
      <MaxWidthWrapper styles={styles}>
        <SentenceLikeCardList
          list={sentences?.list}
          isLoading={isSentenceLoading}
          showBook={false}
          onToggleLike={mutate}
        />
        <Pagination
          css={pagination}
          count={sentences?.pageTotal || 1}
          shape="rounded"
          page={page}
          onChange={(_, page) => setPage(page)}
        />
      </MaxWidthWrapper>
    </>
  );
};

const styles = css`
  padding-top: 36px;
  padding-bottom: 36px;
`;
export default BookDetailContainer;
