/** @jsxImportSource @emotion/react */

import { useParams } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
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
import { queryKey as bookSentenceQueryKey } from '@/lib/hooks/useBookSentenceQuery';
import useBookDetailQuery from './hooks/useBookDetailQuery';

const BookDetailContainer = () => {
  const queryClient = useQueryClient();
  const { id } = useParams();
  const { page, setPage } = usePagination();
  const {
    data: book,
    isLoading: isBookLoading,
    isError,
    error,
  } = useBookDetailQuery(id);

  const { data: sentences, isLoading: isSentenceLoading } =
    useBookSentenceQuery({ id, page });
  const updateLikeListAfterToggle = (sentence: Sentence) => {
    const queryKey = bookSentenceQueryKey({ id, page });
    queryClient.setQueryData(queryKey, (result: PaginationResult<Sentence>) => {
      return {
        ...result,
        list: result.list?.map((liked) =>
          liked._id === sentence._id ? sentence : liked
        ),
      };
    });
  };

  const { mutate } = useToggleSentenceLike(updateLikeListAfterToggle);

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
          onToggleLike={mutate}
        />
        <Pagination
          css={pagination}
          count={sentences?.pageTotal || 1}
          shape='rounded'
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
