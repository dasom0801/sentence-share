import type { Book } from '@/types';
import { TextField } from '@mui/material';

import { useRef } from 'react';

import { useBookSearchQuery } from '../../hooks/useBookSearchQuery';

import classes from './BookSearch.module.scss';
import { BookSearchResults } from './components';
import { useBookSearchState, useClickOutside } from './hooks';

type BookSearchProps = {
  handleBookSelect: (book: Book) => void;
};

export default function BookSearch({ handleBookSelect }: BookSearchProps) {
  const {
    input,
    search,
    handleFocus,
    handleBlur,
    clearSearch,
    handleInputChange,
    shouldShowList,
  } = useBookSearchState();

  // 무한 로딩
  const { data, isLoading, fetchNextPage } = useBookSearchQuery(search);

  const listRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  // 컴포넌트 포커스 해제
  useClickOutside([searchRef, listRef], () => handleBlur());

  const selectBook = (book: Book) => {
    handleBookSelect(book);
    clearSearch();
  };

  return (
    <div className={classes.wrapper}>
      <TextField
        className={classes.textarea}
        size="small"
        type="search"
        placeholder="책 이름을 입력해주세요"
        value={input}
        onChange={handleInputChange}
        onFocus={handleFocus}
        ref={searchRef}
      />

      {shouldShowList && (
        <div ref={listRef} className={classes.listWrapper}>
          <BookSearchResults
            books={data?.books || []}
            isLoading={isLoading}
            onBookSelect={selectBook}
            onFetchNextPage={fetchNextPage}
          />
        </div>
      )}
    </div>
  );
}
