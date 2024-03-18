/** @jsxImportSource @emotion/react */
import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';
import { css } from '@emotion/react';
import { Button, TextField, debounce } from '@mui/material';

import {
  BookListItem,
  BookListItemSkeleton,
  MaxWidthWrapper,
} from '@/components';
import { useScrollEnd } from '@/lib/hooks';
import {
  SentenceEditDataProps,
  SentenceEditStep,
} from './SentenceEditContainer';
import { useBookSearchQuery } from './hooks';

type BookSearchProps = Pick<
  SentenceEditDataProps,
  'book' | 'setBook' | 'setActive'
>;

const BookSearch = ({ book, setBook, setActive }: BookSearchProps) => {
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

  const debouncedSetSearch = useCallback(
    debounce((value: string) => {
      setSearch(value);
    }, 300),
    []
  );

  const onChangeInput = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      setInput(value);
      debouncedSetSearch(value);
    },
    [debouncedSetSearch]
  );

  const handleBookClick = (book: Book) => {
    setBook(book);
    setFocused(false);
    setSearch('');
  };

  const handleChangeActive = () => {
    setActive(SentenceEditStep.INPUT);
  };

  return (
    <MaxWidthWrapper styles={styles}>
      <TextField
        className='search-input'
        size='small'
        type='search'
        placeholder='책 이름을 입력해주세요'
        value={input}
        onChange={onChangeInput}
        onFocus={() => setFocused(true)}
        ref={searchRef}
      />
      {focused && search ? (
        <ul ref={listRef}>
          {!data?.pages.length && isLoading ? (
            <>
              {Array.from({ length: 5 }, (_, index) => (
                <li key={index}>
                  <BookListItemSkeleton />
                </li>
              ))}
            </>
          ) : (
            <>
              {data?.pages.map((bookResult: PaginationResult<Book>) =>
                bookResult.list.map((book, index) => (
                  <li key={`${book.isbn}-${index}`}>
                    <button onClick={() => handleBookClick(book)}>
                      <BookListItem book={book} />
                    </button>
                  </li>
                ))
              )}
            </>
          )}
        </ul>
      ) : (
        book && (
          <>
            <BookListItem book={book} />
            <Button
              color='secondary'
              variant='contained'
              onClick={handleChangeActive}
            >
              책 선택 완료
            </Button>
          </>
        )
      )}
    </MaxWidthWrapper>
  );
};

const styles = css`
  display: flex;
  flex-direction: column;
  padding-top: 36px;
  padding-bottom: 36px;
  height: calc(100vh - 56px);

  .search-input {
    width: 100%;
  }

  ul {
    margin: 8px 0 0 0;
    overflow-y: auto;
    li + li {
      margin: 16px 0 0 0;
    }
    button {
      width: 100%;
    }
  }

  > button {
    margin: 24px 0 0 0;
  }
`;
export default BookSearch;
