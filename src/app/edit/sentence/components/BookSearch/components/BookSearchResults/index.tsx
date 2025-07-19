import { Book } from '@/types';
import { useRef } from 'react';
import { useInfiniteScroll } from '../../hooks';
import BookSearchList from '../BookSearchList';
import BookSearchListSkeleton from '../BookSearchListSkeleton';

type BookSearchResultsProps = {
  books: Book[];
  isLoading: boolean;
  onBookSelect: (book: Book) => void;
  onFetchNextPage: () => void;
};

export default function BookSearchResults({
  books,
  isLoading,
  onBookSelect,
  onFetchNextPage,
}: BookSearchResultsProps) {
  const listLoaderRef = useRef<HTMLDivElement>(null);
  useInfiniteScroll(listLoaderRef, onFetchNextPage);

  if (isLoading && books?.length === 0) {
    return <BookSearchListSkeleton length={5} />;
  }
  return (
    <>
      <BookSearchList books={books} handleOnClickBook={onBookSelect} />
      <div ref={listLoaderRef} style={{ height: '1px' }} />
    </>
  );
}
