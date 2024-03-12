/** @jsxImportSource @emotion/react */
import { useContext, useEffect, useRef, useState } from 'react';
import { css } from '@emotion/react';

import {
  BookListItem,
  BookListItemSkeleton,
  Button,
  MaxWidthWrapper,
} from '@/components';
import useScrollEnd from '@/lib/hooks/useScrollEnd';
import { useBookSearchQuery } from './hooks/useBookSearch';
import { SentenceEditContenxt } from './SentenceEditContainer';
import { TextField } from '@mui/material';

const BookSearchContainer = () => {
  const [focused, setFocused] = useState(false);
  const [search, setSearch] = useState('');
  const searchRef = useRef<HTMLDivElement>(null);
  const { data, isLoading, fetchNextPage } = useBookSearchQuery(search);
  const listRef = useRef<HTMLUListElement>(null);
  useScrollEnd(listRef, fetchNextPage);
  const { book, setBook, setActive } = useContext(SentenceEditContenxt);

  const handleBookClick = (book: Book) => {
    setBook(book);
    setFocused(false);
    setSearch('');
  };

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

  return (
    <MaxWidthWrapper styles={styles}>
      <TextField
        className='search-input'
        size='small'
        type='search'
        placeholder='책 이름을 입력해주세요'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onFocus={() => setFocused(true)}
        ref={searchRef}
      />
      {focused && search ? (
        <ul ref={listRef}>
          {!data?.pages.length && isLoading ? (
            <>
              {Array.from({ length: 5 }, (_, index) => (
                <BookListItemSkeleton key={index} />
              ))}
            </>
          ) : (
            <>
              {data?.pages.map((bookResult: PaginationResult<Book>) =>
                bookResult.list.map((book) => (
                  <li key={book.isbn}>
                    <BookListItem
                      book={book}
                      onClick={() => handleBookClick(book)}
                    />
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
              onClick={() => setActive('input')}
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
  height: calc(100vh - 56px);
  padding-top: 32px;
  padding-bottom: 32px;

  .search-input {
    width: 100%;
  }

  ul {
    margin: 8px 0 0 0;
    overflow-y: auto;
    li + li {
      margin: 16px 0 0 0;
    }
  }

  > button {
    margin: 24px 0 0 0;
  }
`;
export default BookSearchContainer;