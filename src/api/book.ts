import type { Book, PaginationResult, Sentence } from '@/types';
import queryString from 'query-string';
import { fetchAPI } from './fetcher';
import type { BookSearchParams, BookSentenceListParams } from './types';

export const getBook = async (bookId?: string) => {
  return fetchAPI<Book>(`/books/${bookId}`);
};

export const getBookSentence = async (params: BookSentenceListParams) => {
  const { bookId, ...rest } = params;
  const query = queryString.stringify(rest);
  return fetchAPI<PaginationResult<Sentence>>(
    `/books/${bookId}/sentences?${query}`,
  );
};

export const searchBookWithKakaoAPI = async ({
  query,
  page = 1,
}: BookSearchParams) => {
  return await fetchAPI<PaginationResult<Book>>(
    `/books/external/kakao/search?query=${query}&page=${page}`,
  );
};
