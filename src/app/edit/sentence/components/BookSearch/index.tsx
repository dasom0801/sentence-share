import type { Book } from '@/types';
import { debounce, TextField } from '@mui/material';

import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';

import { useBookSearchQuery } from '../../hooks/useBookSearchQuery';
import BookListItem from '../BookListItem';
import BookListItemSkeleton from '../BookListItemSkeleton';
import classes from './BookSearch.module.scss';
import { useScrollEnd } from './hooks';

import { sanitizeInput } from '@/utils/sanitize';

type BookSearchProps = {
  handleBookSelect: (book: Book) => void;
};

export default function BookSearch({ handleBookSelect }: BookSearchProps) {
  const [focused, setFocused] = useState(false);
  const [search, setSearch] = useState('');
  const [input, setInput] = useState('');
  const searchRef = useRef<HTMLDivElement>(null);
  const { data, isLoading, fetchNextPage } = useBookSearchQuery(search);
  const listRef = useRef<HTMLUListElement>(null);
  useScrollEnd(listRef, fetchNextPage);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // 검색어 input과 리스트 바깥 영영을 클릭했을 때를 감지해서 state를 변경한다.
      if (
        searchRef.current &&
        !listRef.current?.contains(event.target as Node) &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setFocused(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [searchRef]);

  const debouncedSetSearch = debounce((value: string) => {
    const senitizedValue = sanitizeInput(value);
    setSearch(senitizedValue);
  }, 500);

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      setInput(value);
      debouncedSetSearch(value);
    },
    [debouncedSetSearch],
  );

  const handleFocus = useCallback(() => {
    setFocused(true);
  }, [setFocused]);

  const handleBookClick = (book: Book) => {
    handleBookSelect(book);
    setFocused(false);
    setSearch('');
  };

  return (
    <div className={classes.wrapper}>
      <TextField
        className={classes.textarea}
        size="small"
        type="search"
        placeholder="책 이름을 입력해주세요"
        value={input}
        onChange={handleChange}
        onFocus={handleFocus}
        ref={searchRef}
      />
      {focused && search ? (
        <ul className={classes.list} ref={listRef}>
          {!data?.books.length && isLoading ? (
            <>
              {Array.from({ length: 5 }, (_, index) => (
                <li key={index}>
                  <BookListItemSkeleton />
                </li>
              ))}
            </>
          ) : (
            <>
              {data?.books.map((book: Book, index: number) => (
                <li
                  key={`${book.isbn}-${index}`}
                  onClick={() => handleBookClick(book)}
                >
                  <BookListItem book={book} />
                </li>
              ))}
            </>
          )}
        </ul>
      ) : null}
    </div>
  );
}
