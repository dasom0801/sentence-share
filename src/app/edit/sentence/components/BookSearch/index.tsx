'use client';

import type { Book } from '@/types';
import { TextField } from '@mui/material';

import { useRef } from 'react';

import { useSentenceEdit } from '../../contexts';
import classes from './BookSearch.module.scss';
import { BookSearchResults } from './components';
import {
  useBookSearchQuery,
  useBookSearchState,
  useClickOutside,
} from './hooks';

export default function BookSearch() {
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

  // 컴포넌트 포커스 해제
  const listRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  useClickOutside([searchRef, listRef], () => handleBlur());

  const { selectBook, errors } = useSentenceEdit();
  const onSelectBook = (book: Book) => {
    selectBook(book);
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
        error={!!errors.book}
        helperText={errors.book}
      />

      {shouldShowList && (
        <div ref={listRef} className={classes.listWrapper}>
          <BookSearchResults
            books={data?.books || []}
            isLoading={isLoading}
            onBookSelect={onSelectBook}
            onFetchNextPage={fetchNextPage}
            scrollContainer={listRef}
          />
        </div>
      )}
    </div>
  );
}
